import React from 'react';
import * as types from '../../constants/ActionTypes';
import Nit from './_Nit';

export default class Ent extends React.Component {
    nit;
    entName;
    dbTable;
    initNit() {
        //let {dbTable,entName} = props;
        this.nit.dbTable = this.dbTable;
        this.nit.entName = this.entName;
    }
    constructor(props) {

        super(props);
        this.nit = new Nit();
        // Waiting for @decorators to make it into the mainstream.  e.g., core-decorators
        // Would love to use @autobind instead of this shotgun-blast technique below

        /* Bind 'this' (the instance) on all methods of prototype of 'this' (the instance)
        */

        for (let prop of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
            let method = this[prop];
            if (!(method instanceof Function) || method === this.constructor) continue;
            this[prop] = this[prop].bind(this);
        }



    }
    // A manual way of binding 'this' to just selected methods 
    _bind(...methods) {
        methods.forEach((method) => this[method] = this[method].bind(this));
    }

    assignProperties(entObj) {
        Object.assign(this, entObj);
    }

    getPropMap() {
        let propMap = {};
        for (let prop of Object.getOwnPropertyNames(this)) {
            if ((this[prop] instanceof Function)) continue;
            //TODO skip boilerplate props such as __prototype__ and 'props'
            if (prop instanceof Object) continue;
            propMap[prop] = this[prop];
        }
        return propMap;
    }


}