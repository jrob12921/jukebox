function Song(name, artist, filename, filetype, image){
  this.name = name
  this.artist = artist
  this.filename = filename
  this.filetype = filetype
  this.image = image
}

function Jukebox(){
  this.songList = []
  this.playlist = []

  this.addSongToJukebox = function(song) {
    // this.songList.push([song.name, song.artist, song.filename, song.filetype, song.image])
    this.songList.push(song)
  }

  this.queuePlaylist = function() {


  }


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
    var num_songs = this.songList.length
    var rand_song_index = Math.floor(Math.random() * num_songs)
    var new_song = $(".indiv_song")[rand_song_index]

    this.play_new_song(new_song)
  }

  this.play_new_song = function(e){
    var new_song_index = $(e).index()

    // this line is necessary because although there are 6 elements with class "indiv_song", the index resets when you move from "left_list" div to "right_list" div
    if ($(e).parent().attr("id") == "right_list") {
      new_song_index += 3
    }

    $("#now_playing_name").text(this.songList[new_song_index].name)
    $("#now_playing_artist").text(this.songList[new_song_index].artist)
    
    $("#song").attr({
      src:"songs/" + this.songList[new_song_index].filename, 
      type:this.songList[new_song_index].filetype
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
    var new_song_index = (current_song_index - 1 + num_songs ) % num_songs
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

  //create 6 song objects

  var landing = new Song("Landing", "Pigeons Playing Ping Pong", "landing.mp3", "audio/mpeg", "pigeons_image.jpg")

  var one_more_time = new Song("One More Time", "Daft Punk", "one_more_time.mp3", "audio/mpeg", "daft_punk_image.jpg")

  var do_it_like_you_do = new Song("Do It Like You Do", "Lettuce", "do_it_like_you_do.mp3", "audio/mp3", "lettuce_image.jpg")

  var jessica = new Song("Jessica", "The Allman Brothers", "jessica.mp3", "audio/mpeg", "allman_brothers_image.jpg")

  var walking_in_circles = new Song("Walking In Circles", "Raq", "walking_in_circles.mp3", "audio/mpeg", "raq_image.jpg")

  var syncopated_healing = new Song("Syncopated Healing", "Twiddle", "syncopated_healing.mp3", "audio/mp3", "twiddle_image.jpg")

  //create new jukebox object
  var juke = new Jukebox()

  //add songs to jukebox
  juke.addSongToJukebox(landing)
  juke.addSongToJukebox(one_more_time)
  juke.addSongToJukebox(do_it_like_you_do)
  juke.addSongToJukebox(jessica)
  juke.addSongToJukebox(walking_in_circles)
  juke.addSongToJukebox(syncopated_healing)

  //these two lines are just here so i can play with the song list in the console
  list = juke.songList
  console.log(list)

  //this just makes my life easier later
  song_titles = []

  for (var i = 0; i < juke.songList.length; i++){
    song_titles.push(juke.songList[i].name)
  }
  // debugger
  
  // $(".indiv_song").each(function(){
  //   $(this).html("<span class='song_info roboto_font'>" + $(this).data("list").name.toUpperCase()  + "</span><br><br><span class='song_info handlee_font'>BY</span><br><br><span class='song_info roboto_font'>" + $(this).data("list").artist.toUpperCase() + "</span>")
    
  //   $(this).css("background-image", "url(images/" + $(this).data("list").image + ")" )
    
  //   song_titles.push($(this).data("list").name)
  //   // debugger
  //   })


  //set song buttons information
  for (var i = 0; i < juke.songList.length; i++) {

    $(".indiv_song").eq(i).html("<span class='song_info roboto_font'>" + juke.songList[i].name.toUpperCase()  + "</span><br><br><span class='song_info handlee_font'>BY</span><br><br><span class='song_info roboto_font'>" + juke.songList[i].artist.toUpperCase() + "</span>")

    $(".indiv_song").eq(i).css("background-image", "url(images/" + juke.songList[i].image + ")" )
  }


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

  $("#queue_song").click(function(event){
    juke.queue(event.currentTarget)
  })

})