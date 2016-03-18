  function Jukebox(){


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

        var percent = 100 * current_time / song.duration;
        $(".timeBar").css('width', percent +'%');

    }

       
    this.update_progress = function(x) {
        var progress = $(".progressBar")
        var maxduration = song.duration
        var position = x - progress.offset().left
        var percentage = 100 * position / progress.width()
     
        //Check within range
        if(percentage > 100) {
            percentage = 100
        }
        if(percentage < 0) {
            percentage = 0
        }
     
        //Update progress bar and video currenttime
        $('.timeBar').css('width', percentage+'%')
        song.currentTime = maxduration * percentage / 100
    }

    this.play_random_song = function(){
      var num_songs = $(".indiv_song").length
      var rand_song_index = Math.floor(Math.random() * num_songs)

      
      var new_song = $(".indiv_song")[rand_song_index]

      this.play_new_song(new_song)
    }

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

    this.next_song = function() {
      var current_song_name = $("#now_playing_name").text()
      var num_songs = $(".indiv_song").length
      var current_song_index = $.inArray(current_song_name, song_titles)
      var new_song_index = (current_song_index + 1) % num_songs
      var new_song = $(".indiv_song")[new_song_index]

      this.play_new_song(new_song)
    }

    this.prev_song = function() {
      var current_song_name = $("#now_playing_name").text()
      var num_songs = $(".indiv_song").length
      var current_song_index = $.inArray(current_song_name, song_titles)
      var new_song_index = (current_song_index + - 1 + num_songs ) % num_songs
      var new_song = $(".indiv_song")[new_song_index]

      this.play_new_song(new_song)
    }

    this.stop_song = function() {
      song.currentTime = 0
      song.pause()
      $("#play_pause_image").attr("src","images/play.svg")

    }

  }

$(document).ready(function(){
  
  var juke = new Jukebox()
  song_titles = []
  
  $(".indiv_song").each(function(){
    $(this).html("<span class='song_info'>" + $(this).data("list").name.toUpperCase()  + "</span><br><br><span class='song_info'>BY</span><br><br><span class='song_info'>" + $(this).data("list").artist.toUpperCase() + "</span>")
    
    $(this).css("background-image", "url(images/" + $(this).data("list").image + ")" )
    
    song_titles.push($(this).data("list").name)
    // debugger
    })


  var song = $("#song")[0]




  $(".indiv_song").click(function(event){
    juke.play_new_song(event.currentTarget)
  })

  $("#play_pause").click(function(){
    juke.play_pause()
  })

  var dragging = false
  
  $(".progressBar").mousedown(function(event) {
      dragging = true
      juke.update_progress(event.pageX)
  })

  $(document).mouseup(function(event) {
      if(dragging) {
          dragging = false
          juke.update_progress(event.pageX)
      }
  })

  $(document).mousemove(function(event) {
      if(dragging) {
          juke.update_progress(event.pageX)
      }
  })

  $("#random").click(function(){
    juke.play_random_song()
  })

  $("#stop").click(function(){
    juke.stop_song()
  })

  $("#next_song").click(function(){
    juke.next_song()
  })

  $("#prev_song").click(function(){
    juke.prev_song()
  })

})