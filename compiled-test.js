/*

id = "foo"
count = 5

items = .items.item[ .count < count ]

match / {
    id = .id
    <ul id="{ id }">
        apply items content
        apply .items.item[ .selected && .id == id ] content
    </ul>
}

match .item[ .id == id ] content {
    <li>{ .title }</li>
}

*/

var P = Module.prototype;

//  ---------------------------------------------------------------------------------------------------------------  //
//  JPaths
//  ---------------------------------------------------------------------------------------------------------------  //

//  .count
P.j0 = [ 'count' ];

//  .items.item[ .count > count ]
P.j1 = [ 'items', 'item', 2, 'p0' ];

//  .title
P.j2 = [ 'title' ];

//  .id
P.j3 = [ 'id' ];

//  .selected
P.j4 = [ 'selected' ];

//  .items.item[ .selected && .id = id ]
P.j5 = [ 'items', 'item', 2, 'p1' ];

//  .item
P.j6 = [ 'item' ];

//  .item[ .id = id ]
P.j7 = [ 'item', 2, 'p2' ];

//  ---------------------------------------------------------------------------------------------------------------  //
//  Vars
//  ---------------------------------------------------------------------------------------------------------------  //

function selector(jid) {
    return function(c0) {
        return this.select(jid, c0);
    };
}

//  5
P.v0 = 5;
//  .items.item[ .count > count ]
P.v1 = selector('j1');
/*
P.v1 = function(c0) {
    return this.select('j1', c0);
};
*/
//  .id
P.v2 = selector('j3');
/*
P.v2 = function(c0) {
    return this.select('j3', c0);
};
*/
P.v3 = "foo";

//  ---------------------------------------------------------------------------------------------------------------  //
//  Predicates
//  ---------------------------------------------------------------------------------------------------------------  //

//  .count < count
P.p0 = function(c0, i0, l0) {
    return this.selectAsScalar('j0', c0) < this.v0;
};

//  .selected && .id = id
P.p1 = function(c0, i0, l0) {
    var v2_ = this.v2(c0);
    return this.selectAsBool('j4', c0) && this.selectAsScalar('j3', c0) == v2_;
};

//  .id = id
P.p2 = function(c0, i0, l0) {
    return this.selectAsScalar('j3', c0) == this.v3;
};

//  ---------------------------------------------------------------------------------------------------------------  //
//  Templates
//  ---------------------------------------------------------------------------------------------------------------  //

//  match /
P.t0 = function(c0, a0, i0, l0) {
    //  items = .items.item[ .count < count ]
    var v1_ = this.gvars('v1', c0);
    //  id = .id
    var v2_ = this.v2(c0);
    var r0 = '';
    r0 += '<ul id="' + v2_ + '">';
    //  apply items
    r0 += this.applyValue(v1_, 'content', a0);
    //  apply .items.item[ .selected && .id == id ]
    r0 += this.applyValue(this.select('j5', c0), 'content', a0);
    r0 += '</ul>';
    return r0;
};
P.t0.selector = null;

//  match .item content
P.t1 = function(c0, a0, i0, l0) {
    var r0 = '';
    r0 += '<li>';
    //  .title
    r0 += this.selectAsScalar('j2', c0);
    r0 += '</li>';
    return r0;
};
P.t1.selector = 'j7';

P.matcher = {
    '': {
        '': [ 't0' ]
    },
    'content': {
        'item': [ 't1' ]
    }
};
