$(document).ready(function(){
  
  $(".indiv_song").each(function(){
    $(this).html("<span>" + $(this).data("list").name.toUpperCase()  + "</span><br><br><span>by</span><br><br><span>" + $(this).data("list").artist.toUpperCase() + "</span>")
    })

  function Jukebox(){

    var song = $("#song")[0]

      song.onloadedmetadata = function() {
          var song_length = song.duration
          var min = Math.floor(song_length / 60)
          var seconds = Math.floor(song_length % 60)
          var seconds_with_zeroes = ("0" + seconds).substr(-2)
          $(".duration").text(min + ":" + seconds_with_zeroes)
      }
       
      song.ontimeupdate = function() {
          var current_time = song.currentTime
          var min = Math.floor(current_time / 60)
          var seconds = Math.floor(current_time % 60)
          var seconds_with_zeroes = ("0" + seconds).substr(-2)
          $(".current").text(min + ":" + seconds_with_zeroes)

          var percent = 100 * current_time / song.duration; //in %
          $(".timeBar").css('width', percent +'%');
      }

      var dragging = false   /* Drag status */
      $(".progressBar").mousedown(function(e) {
          dragging = true
          updatebar(e.pageX)
      })

      $(document).mouseup(function(e) {
          if(dragging) {
              dragging = false
              updatebar(e.pageX)
          }
      })

      $(document).mousemove(function(e) {
          if(dragging) {
              updatebar(e.pageX)
          }
      })
       
      //update Progress Bar control
      var updatebar = function(x) {
          var progress = $(".progressBar");
          var maxduration = song.duration; //Video duraiton
          var position = x - progress.offset().left; //Click pos
          var percentage = 100 * position / progress.width();
       
          //Check within range
          if(percentage > 100) {
              percentage = 100;
          }
          if(percentage < 0) {
              percentage = 0;
          }
       
          //Update progress bar and video currenttime
          $('.timeBar').css('width', percentage+'%');
          song.currentTime = maxduration * percentage / 100;
      };




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