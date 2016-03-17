$(document).ready(function(){
  function Jukebox(){

    var song = $("#song")[0]

    $(".indiv_song").each(function(){
      $(this).html("<span>" + $(this).data("list").name.toUpperCase()  + "</span><br><br><span>by</span><br><br><span>" + $(this).data("list").artist.toUpperCase() + "</span>")
      })

    $(".indiv_song").click(function(){
      var new_song = $(this)

      $("#now_playing_name").text(new_song.data("list").name)
      $("#now_playing_artist").text(new_song.data("list").artist)
      
      $("#song").attr({
        src:"songs/" + new_song.data("list").filename, 
        type:new_song.data("list").filetype
      })

      song.play()
      $("#play_pause_image").attr("src","images/pause.svg")
    })

    $("#play_pause").click(function(){
      if (song.paused) {
        song.play()
        $("#play_pause_image").attr("src","images/pause.svg")
      } else {
        song.pause()
        $("#play_pause_image").attr("src","images/play.svg")
      }
    })


    $("#stop").click(function(){
      $("#song").get(0).stop()
    })

  }

  var juke = new Jukebox()

})