const mongoose = require('mongoose');
const urlEncode = require('../encode');
const Schema = mongoose.Schema;

const CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: {type: Number, default: 0}
})

const counter = mongoose.model('counter', CounterSchema);

const urlSchema = new Schema({
    original_url: String,
    seq_id: Number,
    short_url: String
});

urlSchema.pre ('save', function(next) {
    const doc = this;
    counter.findByIdAndUpdate({_id: 'url_counter'}, {$inc: {seq: 1} }, function(err, counter) {
        if(err) return next(err);
        console.log(counter);
        doc.seq_id = counter.seq;
        doc.short_url = urlEncode.encode(doc.seq_id);
        next();
    })
})

module.exports = mongoose.model('url', urlSchema)