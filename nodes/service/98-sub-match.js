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

    function resolvePattern({
        pattern,
        validations
    }) {
        return pattern
    }

    // The main node definition - most things happen in here
    function PatternMatchNode(n) {
        // Create a RED node
        RED.nodes.createNode(this, n);

        // Store local copies of the node configuration (as defined in the .html)
        this.topic = n.topic;
        this.pattern = n.pattern || {};
        this.pattern.$maxMessages = n.maxMessages
        this.framework = n.framework || 'hermera';

        // copy "this" object in case we need it in context of callbacks of other functions.
        var node = this;

        // Do whatever you need to do in here - declare callbacks etc
        // Note: this sample doesn't do anything much - it will only send
        // this message once at startup...
        // Look at other real nodes for some better ideas of what to do....
        var msg = {};
        msg.topic = this.topic;

        let selectedFramework = RED.settings[node.framework]
        if (!selectedFramework) {
            node.error(`No settings defined for framework: ${node.framework}`)
            return
        }
        const actor = selectedFramework()
        // Use Joi as payload validator
        // https://github.com/senecajs/seneca-joi
        let pattern = resolvePattern({
            pattern: node.pattern,
            validations: node.validations
        })
        actor.act(pattern,
            // see http://senecajs.org/getting-started/#patterns
            (payload, cb) => {
                msg.$payload = payload
                msg.$cb = cb
                // send msg to a function node which can then use the $cb
                // to publish message to hermera queue
                node.send(msg)
            }
        )

        this.on('close', function () {
            // Called when the node is shutdown - eg on redeploy.
            // Allows ports to be closed, connections dropped etc.
            // eg: node.client.disconnect();
        });
    }

    // Register the node by name. This must be called before overriding any of the
    // Node functions.
    RED.nodes.registerType('sub-match', PatternMatchNode);

}