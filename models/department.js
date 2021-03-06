var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DepartmentSchema = new Schema({
  // _id: Schema.Types.ObjectId,
  id_bot: {
    type: String,
    // required: true
  },
  bot_only: {
    type: Boolean,
    // required: true
  },
  routing: {
    type: String,
    default:"pooled"
    // required: true
  },
  name: {
    type: String,
    required: true
  },
  id_project: {
    type: String,
    required: true
  },
  id_group: {
    type: String,
    // required: true
  },
  online_msg: {
    type: String,
    // required: true
  },
  offline_msg: {
    type: String,
    // required: true
  },
  default: {
    type: Boolean,
    default:false
    // required: true
  },
  status: {
    type: Number,
    default: 1
    // required: true
  },
  createdBy: {
    type: String,
    required: true
  }
},{
  timestamps: true
}
);

module.exports = mongoose.model('department', DepartmentSchema);
