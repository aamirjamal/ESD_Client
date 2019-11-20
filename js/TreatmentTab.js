Project.TreatmentTab = (function() {
  function buildTabContent(data) {
    console.log(data);
    let treatmentInfo = `<h4>Treatments</h4>`;
    if ($("count", data).text() === "0") {
      treatmentInfo += `<p>No Treatment info available</p>`;
    } else {
      treatmentInfo += `<div class="row">
                          <span class="col s7">
                              <b>Type</b>
                          </span>
                          <span class="col s3">
                              <b>Abbreviation</b>
                          </span>
                          </div>`;
      $("treatment", data).each(function() {
        treatmentInfo += `<div class="row">
                          <span class="col s7">
                          ${$("type", this).text()}
                          </span>
                          <span class="col s3">
                          ${$("abbreviation", this).text()}
                          </span>
                          </div>`;
      });
      $("#Treatment").html(treatmentInfo);
    }
  }

  return {
    buildTabContent: buildTabContent
  };
})();
