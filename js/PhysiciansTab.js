Project.PhysiciansTab = (function() {
  function buildTabContent(data) {
    console.log(data);
    let phyInfo = `<h4>Physicians with Admitting Privilages</h4>`;
    if ($("count", data).text() === "0") {
      phyInfo += `<p>No Physician info available</p>`;
    } else {
      phyInfo += `<div class="row">
                      <span class="col s5">
                          <b>Name</b>
                      </span>
                      <span class="col s3">
                          <b>License</b>
                      </span>
                      <span class="col s3">
                          <b>Contact</b>
                      </span>
                      </div>`;
      $("physician", data).each(function() {
        phyInfo += `<div class="row">
                      <span class="col s5">
                      ${$("fName", this).text()} ${$("mName", this).text()} ${$(
          "lName",
          this
        ).text()}
                      </span>
                      <span class="col s3">
                      ${$("license", this).text()}
                      </span>
                      <span class="col s3">
                      ${$("phone", this).text()}
                      </span>
                      </div>`;
      });
      $("#Physicians").html(phyInfo);
    }
  }
  return {
    buildTabContent: buildTabContent
  };
})();
