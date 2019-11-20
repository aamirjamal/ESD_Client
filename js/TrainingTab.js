Project.TrainingTab = (function() {
  function buildTabContent(data) {
    console.log(data);
    let trainingInfo = `<h4>Services/Training</h4>`;
    if ($("count", data).text() === "0") {
      trainingInfo += `<p>No Training info available</p>`;
    } else {
      trainingInfo += `<div class="row">
                            <span class="col s7">
                                <b>Type</b>
                            </span>
                            <span class="col s3">
                                <b>Abbreviation</b>
                            </span>
                            </div>`;
      $("training", data).each(function() {
        trainingInfo += `<div class="row">
                            <span class="col s7">
                            ${$("type", this).text()}
                            </span>
                            <span class="col s3">
                            ${$("abbreviation", this).text()}
                            </span>
                            </div>`;
      });
      $("#Training").html(trainingInfo);
    }
  }

  return {
    buildTabContent: buildTabContent
  };
})();
