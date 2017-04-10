var channels = ["freecodecamp", "test_channel", "ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

function getChannelInfo(){
        channels.forEach(function(channel){
            function makeURL(type, name){
                return "https://wind-bow.gomix.me/twitch-api/" + type + "/" + name + "?callback=?";
            };

            // check if streams are online/offline using type = "streams"
            $.getJSON(makeURL("streams", channel), function(data){
                var game, status;
                if(data.stream == null){
                    game = "Offline";
                    status = "Offline";
                } else if (data.stream === undefined){
                    game = "Account Closed";
                    status = "offline";
                } else {
                    game = data.stream.game;
                    status = "online";
                };

                // get channel info
                $.getJSON(makeURL("channels", channel), function(data){
                    // get channel logo, if not place a dummy
                    var logo = data.logo != null ? data.logo : "http://b.vimeocdn.com/ps/588/58832_300.jpg" ;
                    // get channel name
                    var name = data.display_name != null ? data.display_name : channel;
                    // get channel status
                    var description = status === "online" ? ': ' + data.status : "";

                    var html = '<div class="row ' + status +'"><div class="col-xs-2 col-sm-1">'+'<img src="'+ logo + '" id="imgLogo"></div>'
                    +'<div class="col-xs-10 col-sm-3"><a href="'+ data.url + '">'+ name + '</a></div><div class="col-xs-10 col-sm-5">' + description +'</div></div>';

                    status === "online" ? $('.userInfo').prepend(html) : $('.userInfo').append(html);
                });
            });
        });
};

$(document).ready(function(){
    getChannelInfo();
    $('#Online').click(function(){
        $('.Offline').hide();
        $('.online').show();
    });

    $('#Offline').click(function(){
        $('.online').hide();
        $('.Offline').show();
    });

    $('#all').click(function(){
        $('.online').show();
        $('.Offline').show();
    });
});
