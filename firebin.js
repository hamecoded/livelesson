
var firebaseRef = new Firebase('https://firebin.firebaseio.com/');

function saveFirebin() {
  var firebinBody = $('#bin').val();
  if (typeof firebinBody === 'undefined' || firebinBody == '') {
    return;
  }

  var firebinTitle = $('#title').val();
  if (typeof firebinTitle === 'undefined') {
    firebinTitle = '';
  }

  var firebinPayload = {
    body: firebinBody, title: firebinTitle, date: new Date().toString()
  };

  var sha256 = CryptoJS.algo.SHA256.create();
  sha256.update(firebinPayload.body);
  sha256.update(firebinPayload.title);
  sha256.update(firebinPayload.date);
  sha256.update(Math.random().toString());
  var hash = sha256.finalize();

  var firebinMetadata = { views: 0 };

  firebaseRef.child('bin/' + hash).set({
    bin: firebinPayload, metadata: firebinMetadata
  }, function() {
    window.location.hash = hash;
    viewFirebin(hash); 
  });
}

function viewFirebin(hash) {
  $('#create').hide();

  firebaseRef.child('bin/' + hash + '/bin').once('value', function(snapshot) {
    var template = $('#view').html();
    var bin = snapshot.val();
    if (bin == null) {
      bin = { title: 'Not found' };
    } else {
      var views = snapshot.ref().parent().child('metadata/views');
      views.on('value', function(snapshot) {
        $('#viewcount').text(snapshot.val());
      });

      // Only increment the stats if the hash was valid
      views.transaction(function(currentViews) {
        return currentViews + 1;
      });

      // Add ourselves as a viewer of this Firebin and listen for changes.
      var viewer = snapshot.ref().parent().child('metadata/viewer').push(true);
      viewer.removeOnDisconnect();
      viewer.parent().on('value', function(snapshot) {
        var count = snapshot.numChildren();
        $('#viewers').text(count);
      });
    }
    var html = Mustache.to_html(template, bin);
    $('#view').html(html);
    $('#view').show();
  });
}

$(function() {
  firebaseRef.child('.info/connected').once('value', function(s) { } );

  var idx = window.location.href.indexOf('#');
  var hash = (idx > 0) ? window.location.href.slice(idx + 1) : '';
  if (hash === '') {
    // No hash found, so render the file upload button.
    $('#create').show();
    $('#save').on('click', saveFirebin);
  } else {
    // A hash was passed in, so let's retrieve and render it.
    viewFirebin(hash);
  }
});

