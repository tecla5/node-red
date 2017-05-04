/**
 * Copyright Tecla5 and other contributors, http://tecla5.com
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

// If you use this as a template, update the copyright with your own name.

// Sample Node-RED node file


module.exports = function (RED) {
    "use strict";
    // require any external libraries we may need....
    //var foo = require("foo-library");
    const Hemera = require('nats-hemera')
    const nats = require('nats').connect(RED.settings.nats)
    const hemera = new Hemera(nats, {
        logLevel: RED.settings.logLevel || 'info'
    })
    const joi = require('hemera-joi')
    hemera.use(joi)

    // The main node definition - most things happen in here
    function PatternMatchNode(n) {
        // Create a RED node
        RED.nodes.createNode(this, n);

        // Store local copies of the node configuration (as defined in the .html)
        this.topic = n.topic;
        this.pattern = n.pattern || {};
        this.pattern.$maxMessages = n.maxMessages

        // copy "this" object in case we need it in context of callbacks of other functions.
        var node = this;

        // Do whatever you need to do in here - declare callbacks etc
        // Note: this sample doesn't do anything much - it will only send
        // this message once at startup...
        // Look at other real nodes for some better ideas of what to do....
        var msg = {};
        msg.topic = this.topic;
        msg.payload = n.payload || "hello"

        hemera.ready(() => {
            // Use Joi as payload validator
            hemera.setOption('payloadValidator', 'hemera-joi')

            let Joi = hemera.exposition['hemera-joi'].joi
            hemera.act(node.pattern,
                (err, resp) => {
                    msg.err = err
                    msg.resp = resp
                    node.send(msg)
                })
        })

        this.on('close', function () {
            // Called when the node is shutdown - eg on redeploy.
            // Allows ports to be closed, connections dropped etc.
            // eg: node.client.disconnect();
        });
    }

    // Register the node by name. This must be called before overriding any of the
    // Node functions.
    RED.nodes.registerType('pattern-match', PatternMatchNode);

}