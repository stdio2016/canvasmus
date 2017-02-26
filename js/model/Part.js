function Part() {
  this.staffs = [];
  this.score = null;
}

Part.fromJSON = function (json) {
  var part = new Part();
  var staffs = json.staffs;
  for (var i = 0; i < staffs.length; i++) {
    part.addStaff(Staff.fromJSON(staffs[i]));
  }
  return part;
};

Part.prototype.addStaff = function (staff) {
  if (staff.part !== null) {
    throw new Error('Staff already belongs to another Part');
  }
  this.staffs.push(staff);
  staff.part = this;
};
