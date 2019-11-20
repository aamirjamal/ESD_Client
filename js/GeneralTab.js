Project.GeneralTab = (function() {
  function buildTabContent(data) {
    console.log(data);
    let genInfo = "<h4>General Information</h4>";
    if ($(data).find("error").length !== 0) {
      $("#General").html("<h2>Something wrong in ajax call.</h2>");
    } else {
      if ($(data).find("name").length != 0) {
        genInfo += `<div class="row">
            <span class="col s3">Name:</span>
            <span class="col s6"><b>${$("name", data).text()}</b></span>
          </div>`;
      }
      if ($(data).find("email").length != 0) {
        genInfo += `<div class="row">
            <span class="col s3">Email:</span>
            <span class="col s6"><a href="mailto:${$("email", data).text()}">
            ${$("email", data).text()}</a></span>
          </div>`;
      }
      if ($(data).find("website").length != 0) {
        genInfo += `<div class="row">
            <span class="col s3">Website:</span>
            <span class="col s6">
            <a href="${$("website", data).text()}">
            ${$("website", data).text()}</a></span>
          </div>`;
      }
      if ($(data).find("description").length != 0) {
        genInfo += `<div class="row">
            <span class="col s3">Description:</span>
            <span class="col s7"><b>${$("description", data).text()}</b></span>
          </div>`;
      }
      if ($(data).find("nummembers").length != 0) {
        genInfo += `<div class="row">
            <span class="col s3">Number of Members:</span>
            <span class="col s6"><b>${$("nummembers", data).text()}</b></span>
          </div>`;
      }
      if ($(data).find("numcalls").length != 0) {
        genInfo += `<div class="row">
            <span class="col s3">Number of Calls:</span>
            <span class="col s6"><b>${$("numcalls", data).text()}</b></span>
          </div>`;
      }
      if ($(data).find("serviceArea").length != 0) {
        genInfo += `<div class="row">
            <span class="col s3">Service Area:</span>
            <span class="col s6"><b>${$("serviceArea", data).text()}</b></span>
          </div>`;
      }
      $("#General").html(genInfo);
    }
  }

  return {
    buildTabContent: buildTabContent
  };
})();
