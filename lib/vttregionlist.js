(function(root) {

  function VTTRegionList() {
  }
  VTTRegionList.prototype = Object.create(Array.prototype);
  VTTRegionList.prototype.constructor = VTTRegionList;

  VTTRegionList.prototype.getRegionById = function(id) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i].id === id) {
        return this[i];
      }
    }
    return null;
  };

  this.VTTRegionList = this.VTTRegionList || VTTRegionList;

}(this));
