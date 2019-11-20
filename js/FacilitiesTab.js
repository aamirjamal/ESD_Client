Project.FacilitiesTab = (function() {
  function buildTabContent(data) {
    console.log(data);
    let facInfo = `<h4>Facilities</h4>`;
    if ($("count", data).text() === "0") {
      facInfo += `<p>No Facility info available</p>`;
    } else {
      facInfo += `<div class="row">
                    <span class="col s3">
                        <b>Name</b>
                    </span>
                    <span class="col s2">
                        <b>Quantity</b>
                    </span>
                    <span class="col s7">
                        <b>Description</b>
                    </span>
                    </div>`;
      $("facility", data).each(function() {
        facInfo += `<div class="row">
                    <span class="col s3">
                    ${$("type", this).text()}
                    </span>
                    <span class="col s2">
                    ${$("quantity", this).text()}
                    </span>
                    <span class="col s7">
                    ${$("description", this).text()}
                    </span>
                    </div>`;
      });
      $("#Facilities").html(facInfo);
    }
  }
  return {
    buildTabContent: buildTabContent
  };
})();
