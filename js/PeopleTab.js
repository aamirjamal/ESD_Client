Project.PeopleTab = (function () {
    function buildTabContent(data) {
        console.log(data);
        let peopleInfo = `<h4>People</h4>`;
        if ($("siteCount", data).text() === "0") {
            peopleInfo += `<p>No People info available.</p>`;
        } else {
            peopleInfo += `<div class="row">
                      <div class="input-field col s5">
                        <select id='siteselector'>
                        </select>
                        <label>Site:</label>
                      </div>
                    </div>`;
            let opts = `<option value="">Select Site</option>`;
            let count = 0;
            $("site", data).each(function () {
                count++;
                opts += `<option value="ppl${count}">
            ${$(this).attr("address")}</option>`;

                if ($("personCount", this).text() === "0") {
                    peopleInfo += `<div id="ppl${count}"
                         class="row ppl" style="display:none">
                    <p class="col">No person info available for this site.</p>
                    </div>`;
                } else {
                    peopleInfo += `<div id="ppl${count}" class="ppl" style="display:none">
                <div class="row">
                <span class="col s6">
                    <b>Name</b>
                </span>
                <span class="col s3">
                    <b>Role</b>
                </span>
                </div>`;
                    $("person", this).each(function () {
                        peopleInfo += `<div class="row">
                    <span class="col s6">
                    ${$("fName", this).text()} ${$("mName", this).text()} ${$(
                            "lName",
                            this
                        ).text()}
                    </span>
                    <span class="col s3">
                    ${$("role", this).text()}
                    </span>
                    </div>`;
                    });
                    peopleInfo += `</div>`;
                }
            });
            $("#People").html(peopleInfo);
            $("#siteselector").html(opts);
            $("select").formSelect();
            $("#siteselector").change(function () {
                if ($(this).val()) {
                    $(".ppl").hide();
                    $("#" + $(this).val()).show();
                }
            });
        }
    }

    return {
        buildTabContent: buildTabContent
    };
})();
