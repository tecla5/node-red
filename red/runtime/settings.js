/**
 * Copyright JS Foundation and other contributors, http://js.foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

var when = require("when");
var clone = require("clone");
var assert = require("assert");
var log = require("./log");

var userSettings = null;
var globalSettings = null;
var storage = null;

var persistentSettings = {
    init: function (settings) {
        userSettings = settings;
        for (var i in settings) {
            /* istanbul ignore else */
            if (settings.hasOwnProperty(i) && i !== 'load' && i !== 'get' && i !== 'set' && i !== 'available' && i !== 'reset') {
                // Don't allow any of the core functions get replaced via settings
                (function () {
                    var j = i;
                    persistentSettings.__defineGetter__(j, function () {
                        return userSettings[j];
                    });
                    persistentSettings.__defineSetter__(j, function () {
                        throw new Error("Property '" + j + "' is read-only");
                    });
                })();
            }
        }
        globalSettings = null;
    },
    load: function (_storage) {
        storage = _storage;
        return storage.getSettings().then(function (_settings) {
            globalSettings = _settings;
        });
    },
    get: function (prop) {
        if (userSettings.hasOwnProperty(prop)) {
            return clone(userSettings[prop]);
        }
        if (globalSettings === null) {
            throw new Error(log._("settings.not-available"));
        }
        return clone(globalSettings[prop]);
    },

    set: function (prop, value) {
        if (userSettings.hasOwnProperty(prop)) {
            throw new Error(log._("settings.property-read-only", {
                prop: prop
            }));
        }
        if (globalSettings === null) {
            throw new Error(log._("settings.not-available"));
        }
        var current = globalSettings[prop];
        globalSettings[prop] = value;
        try {
            assert.deepEqual(current, value);
            return when.resolve();
        } catch (err) {
            return storage.saveSettings(globalSettings);
        }
    },
    delete: function (prop) {
        if (userSettings.hasOwnProperty(prop)) {
            throw new Error(log._("settings.property-read-only", {
                prop: prop
            }));
        }
        if (globalSettings === null) {
            throw new Error(log._("settings.not-available"));
        }
        if (globalSettings.hasOwnProperty(prop)) {
            delete globalSettings[prop];
            return storage.saveSettings(globalSettings);
        }
        return when.resolve();
    },

    available: function () {
        return (globalSettings !== null);
    },

    seneca: function (config, cb) {
        if (this._seneca) return this._seneca
        this._seneca = require('seneca')(config)
        return this._seneca
    },

    nats(config) {
        if (this._nats) {
            return this._nats
        }
        const natsConfig = config.nats || {
            'url': process.env.NATS_URL,
            'user': process.env.NATS_USER,
            'pass': process.env.NATS_PW
        }
        this._nats = require('nats').connect(natsConfig)
        return this._nats
    },

    hemera: function (config = {}, cb) {
        if (this._hemera) {
            return this._hemera
        }
        // require any external libraries we may need....
        //var foo = require("foo-library");
        const Hemera = require('nats-hemera')
        const nats = RED.settings.nats(config)
        const logLevel = RED.settings.logLevel || 'info'
        const hemeraConfig = config.hemera || {
            logLevel
        }
        const hemera = new Hemera(nats, hemeraConfig)
        if (config.joi !== false) {
            const joi = require('hemera-joi')
            hemera.use(joi)
            hemera.setOption('payloadValidator', 'hemera-joi')
        }
        hemera.$validate = hemera.exposition['hemera-joi'].joi
        this._hemera = hemera
        return hemera
    },
    reset: function () {
        for (var i in userSettings) {
            /* istanbul ignore else */
            if (userSettings.hasOwnProperty(i)) {
                delete persistentSettings[i];
            }
        }
        userSettings = null;
        globalSettings = null;
        storage = null;
    }
}

module.exports = persistentSettings;