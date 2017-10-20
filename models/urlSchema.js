var mongoose = require('mongoose');
var urlEncode = require('../encode');
var Schema = mongoose.Schema;

var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: {type: Number, default: 0}
})

var counter = mongoose.model('counter', CounterSchema);

var urlSchema = new Schema({
    original_url: String,
    seq_id: Number,
    short_url: String
});

urlSchema.pre ('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'url_counter'}, {$inc: {seq: 1} }, function(err, counter) {
        if(err) return next(err);
        console.log(counter);
        doc.seq_id = counter.seq;
        doc.short_url = urlEncode.encode(doc.seq_id);
        next();
    })
})



module.exports = mongoose.model('url', urlSchema)