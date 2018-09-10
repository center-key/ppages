///////////////////////////////////////////////////////////////
// Paradise ~ centerkey.com/paradise                         //
// GPLv3 ~ Copyright (c) individual contributors to Paradise //
///////////////////////////////////////////////////////////////

// Administrator console

const admin = {
   setup: function() {
      window.fetchJson.enableLogger();
      admin.ui.loadSettings();
      admin.ui.loadPortfolio();
      admin.ui.loadAccounts();
      admin.ui.createUploader();
      admin.invites.loadList();
      dna.clone('backup-file',  window.clientData.backupFiles);
      dna.insert('page-footer', window.clientData);
      }
   };

admin.ui = {
   statusMsg: function(message) {
      $('#status-msg').text(message).fadeOut(0).fadeIn();
      },
   loadSettings: function() {
      function handle(data) {
         data.fonts = window.clientData.fonts;
         dna.clone('gallery-settings', data);
         }
      library.rest.get('settings', { callback: handle });
      },
   loadPortfolio: function() {
      function handle(data) {
         dna.clone('portfolio-image', data, { empty: true, fade: true });
         admin.ui.statusMsg('Portfolio images: ' + data.length);
         }
      library.rest.get('portfolio', { action: 'list', callback: handle });
      },
   save: function(elem, type) {
      const field = elem.attr('name');
      const val = elem.is('input[type=checkbox]') ? elem.is(':checked') : elem.val();
      admin.ui.statusMsg('Saving ' + field.replace('-', ' ') + '...');
      const params = {};
      params[field] = val;
      const item = elem.closest('[data-item-id]').data();
      if (item && item.itemId)
         params.id = item.itemId;
      if (item && item.itemType)
         params.item = item.itemType;
      library.rest.get(type, { action: 'update', params: params  });
      },
   savePortfolio: function(elem) {
      admin.ui.save(elem, 'portfolio');
      },
   saveSettings: function(elem) {
      const item = elem.closest('[data-item-id]');  //workaround
      if (item.length)                              //workaround
         item.data().itemId = item.index() + 1;     //workaround
      admin.ui.save(elem, 'settings');
      },
   move: function(elem) {
      const params = {
         id:   dna.getModel(elem).id,
         move: elem.data().move
         };
      function handle() { return params.move === 'up' ? dna.up(elem) : dna.down(elem); }
      library.rest.get('portfolio', { action: 'update', params: params, callback: handle });
      },
   delete: function(elem) {
      const params = { id: dna.getModel(elem).id };
      function handle() { dna.bye(elem); }
      library.rest.get('portfolio', { action: 'delete', params: params, callback: handle });
      },
   loadAccounts: function() {
      function handle(data) { dna.clone('user-account', data); }
      library.rest.get('account', { action: 'list', callback: handle });
      },
   createUploader: function() {
      const spinner = $('#processing-files').hide();
      function handle(data) {
         admin.ui.statusMsg(data.message);
         spinner.delay(2000).fadeOut(admin.ui.loadPortfolio);
         }
      function start() { spinner.fadeIn(); }
      let lastTimeoutId = null;
      function done() {
         function processUploads() {
            if (timeoutId === lastTimeoutId)
               library.rest.get('command', { action: 'process-uploads', callback: handle });
            }
         const timeoutId = window.setTimeout(processUploads, 3000);  //workaround to guess when last upload in done
         lastTimeoutId = timeoutId;
         }
      const options = {
         debug: true,       //view any upload errors in the js console
         element:           $('#file-uploader')[0],
         uploadButtonText:  'Upload images',
         action:            'file-uploader.php',
         allowedExtensions: ['jpg', 'jpeg', 'png'],
         sizeLimit:         2 * 1024 * 1024,  //2 MB
         onSubmit:          start,
         onComplete:        done
         };
      return new window.qq.FileUploader(options);
      }
   };

admin.invites = {
   elem: {
      email:      $('.admin-accounts .send-invite input[type=email]'),
      sendButton: $('.admin-accounts .send-invite button'),
      },
   validate: function(input) {
      admin.invites.elem.sendButton.enable(library.util.cleanupEmail(input.val()));
      },
   send: function(button) {
      button.disable();
      const email = library.util.cleanupEmail(admin.invites.elem.email.val());
      function handle(data) {
         admin.ui.statusMsg(data.message);
         admin.invites.loadList();
         admin.invites.elem.email.focus().val('');
         }
      library.rest.get('invite', { action: 'create', params: { email: email }, callback: handle  });
      },
   loadList: function() {
      function handle(data) {
         dna.clone('account-invite', data, { empty: true, fade: true });
         }
      library.rest.get('invite', { action: 'list', callback: handle });
      }
   };

admin.backups = {
   create: function(button) {
      button.disable();
      admin.ui.statusMsg('Creating backup...');
      function handle(data) {
         admin.ui.statusMsg('Backup "' + data.filename + '" created in ' + data.seconds + ' seconds');
         dna.clone('backup-file', data, { top: true, fade: true });
         button.enable();
         }
      library.rest.get('backup', { action: 'create', callback: handle });
      },
   loadList: function() {
      function handle(data) {
         dna.clone('backup-file', data);
         }
      library.rest.get('backup', { action: 'list', callback: handle });
      }
   };
