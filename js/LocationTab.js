Project.LocationTab = (function () {
    let latlng = [];

    function buildTabContent(data) {
        console.log("Location Data");
        console.log(data);
        let locInfo = `<h4>Location</h4>`;
        if ($("count", data).text() === "0") {
            locInfo += `<p>No Location Information available.</p>`;
        } else {
            // Populate location type in select
            locInfo += `<div class="row">
                            <div class="input-field col s5">
                              <select id='locationselector'>
                              </select>
                              <label>Location:</label>
                            </div>
                          </div>`;
            let opts = `<option value="">Select Location</option>`;
            let count = 0;
            $("location", data).each(function () {
                count++;
                latlng[count] = new google.maps.LatLng($("latitude", this).text(), $("longitude", this).text());
                opts += `<option value="loc${count}">
                            ${$("type", this).text()}
                         </option>`;
                locInfo += `<div class="row"> 
                                <div class="col s6">
                                    <div id="loc${count}" class="row loc" style="display:none">
                                        <div class="row">
                                            <span class="col s3">
                                                <b>Type</b>
                                            </span>
                                            <span class="col s5">
                                                ${$("type", this).text()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div id="maploc${count}" class="col loc s6" style="display:none">
                                    
                                        <div id="map${count}" style="height: 400px; width: 400px;" ></div>
                                    
                                </div>
                            </div>
                            `;
            });
            // Add locinfo to DOM, SELECT also
            $("#Locations").html(locInfo);
            // Add options to select box
            $("#locationselector").html(opts);
            // Add Locaion info to DOM on option selected
            $("select").formSelect();
            $("#locationselector").change(function () {
                if ($(this).val()) {
                    $(".loc").hide();
                    $("#" + $(this).val()).show();
                    $("#map" + $(this).val()).show();
                }
            });

            for(let i = 1; i <= count; i++ ) {
                let map1 = new google.maps.Map(document.getElementById('map'+i), {
                    center: latlng[i],
                    zoom: 12
                });
                let marker1 = new google.maps.Marker({
                    position: latlng[i],
                    title: "Location"
                });
                marker1.setMap(map1);
            }
        }
    }

    return {
        buildTabContent: buildTabContent
    };
})();
