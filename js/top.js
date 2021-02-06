(() => {
    'use strict';


    $("#post_table td").on("click", function() {
        $("#post_details").removeClass("hidden");
    })

    $("#close_iframe").on("click", function() {
        console.log("click");
        $("#post_details").addClass("hidden");
    })
    $("#post_btn").on("click", function() {
        console.log("click");
        $("#post").removeClass("hidden");
    })
    $("#close_post").on("click", function() {
        console.log("click");
        $("#post").addClass("hidden");
    })
})();