Project.LocationTab = (function() {
  function buildTabContent(data) {
    console.log(data);
    let locInfo = `<h4>Location</h4>`;
    if ($("count", data).text() === "0") {
      locInfo += `<p>No Location Information available.</p>`;
    } else {
      locInfo += `<div class="row">
        <div class="input-field col s5">
          <select id='locationselector'>
          </select>
          <label>Location:</label>
        </div>
      </div>`;
      let opts = `<option value="">Select Location</option>`;
      let count = 0;
      $("location", data).each(function() {
        count++;
        opts += `<option value="loc${count}">
                    ${$("type", this).text()}</option>`;
        locInfo += `<div id="loc${count}" class="row loc" style="display:none">
        <div class="row">
        <span class="col s3">
        <b>Type</b>
        </span>
        <span class="col s5">
        ${$("type", this).text()}
        </span></div></div>`;
      });
      $("#Locations").html(locInfo);
      $("#locationselector").html(opts);
      $("select").formSelect();
      $("#locationselector").change(function() {
        if ($(this).val()) {
          $(".loc").hide();
          $("#" + $(this).val()).show();
        }
      });
    }
  }
  return {
    buildTabContent: buildTabContent
  };
})();
