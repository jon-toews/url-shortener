var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: {type: Number, default: 0}
})

var counter = mongoose.model('counter', CounterSchema);

var urlSchema = new Schema({
    original_url: String,
    // short_url: String
})

// urlSchema.pre('save', function(next) {
//     var doc = this;
//     counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1} }, function(error, counter) {
//         if(error) return next(error);
//         doc.shortUrl = counter.seq;
//         next();
//     })
// })

module.exports = mongoose.model('urls', urlSchema)