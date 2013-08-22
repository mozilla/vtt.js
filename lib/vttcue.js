(function(root) {
  function VTTCue(startTime, endTime, text) {
    this.id = "";
    this.startTime = startTime;
    this.endTime = endTime;
    this.text = text;
  }

  root.VTTCue = root.VTTCue || VTTCue;
}(this));
