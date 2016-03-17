$(document).ready(function(){
  
  $(".indiv_song").each(function(){
    $(this).html("<span>" + $(this).data("list").name.toUpperCase()  + "</span><br><br><span>by</span><br><br><span>" + $(this).data("list").artist.toUpperCase() + "</span>")
    })

  function Jukebox(){

    var song = $("#song")[0]

    this.play_new_song = function(e){
      var new_song = $(e)

      $("#now_playing_name").text(new_song.data("list").name)
      $("#now_playing_artist").text(new_song.data("list").artist)
      
      $("#song").attr({
        src:"songs/" + new_song.data("list").filename, 
        type:new_song.data("list").filetype
      })

      song.play()
      $("#play_pause_image").attr("src","images/pause.svg")
    }

    this.play_pause = function(){
      if (song.paused) {
        song.play()
        $("#play_pause_image").attr("src","images/pause.svg")
      } else {
        song.pause()
        $("#play_pause_image").attr("src","images/play.svg")
      }
    }

  }

  var juke = new Jukebox()


  $(".indiv_song").click(function(event){
    juke.play_new_song(event.currentTarget)
  })

  $("#play_pause").click(function(){
    juke.play_pause()
  })

})