function Part() {
  this.staffs = [];
  this.score = null;
}

Part.prototype.addStaff = function (staff) {
  if (staff.part !== null) {
    throw new Error('Staff already belongs to another Part');
  }
  this.staffs.push(staff);
  staff.part = this;
};
