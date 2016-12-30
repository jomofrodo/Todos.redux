import React from 'react';
import * as types from '../constants/ActionTypes';

export default class Ent extends React.Component {

    constructor(props) {

        super(props);
        /* bind 'this' (the instance) on all methods of prototype of 'this' (the instance)
            why ask why?
        */
        for (let prop of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
            let method = this[prop];
            if (!(method instanceof Function) || method === this.constructor) continue;
            //method = method.bind(this);
            this[prop] = this[prop].bind(this);
        }
        // Another way to do this would be to define all object methods using arrow functions, e.g., 
        //
        //     render = () => { ... bleah ...}
        //
        // For whaterver reason, methods defined this way are automatically bound to 'this' instance
    }
    /*
    /* A manual way of doing this
    _bind(...methods) {
        ////debugger;
        methods.forEach((method) => this[method] = this[method].bind(this));
    }*/


}