const dbPromised = idb.open("bolaidb", 1, function (upgradeDb) {
    var upgradeObjectStore = upgradeDb.createObjectStore("teams", {
       keyPath: 'id',
       autoIncrement: true
    });
    upgradeObjectStore.createIndex("name", "name", {
       unique: false
    });
 });
 
 function saveForLater(team) {
    dbPromised
       .then(function (db) {
          var tx = db.transaction("teams", "readwrite");
          var store = tx.objectStore("teams");
          store.put(team);
          return tx.complete;
       })
       .then(function () {
          M.toast({
             html: 'Berhasil disimpan.'
          });
          console.log("Data berhasil di simpan.");
       }).catch(function (error) {
          M.toast({
             html: 'Sudah disimpan di Favorit.'
          });
       });
 }
 
 function getAll() {
    return new Promise(function (resolve, reject) {
       dbPromised
          .then(function (db) {
             var tx = db.transaction("teams", "readonly");
             var store = tx.objectStore("teams");
             return store.getAll();
          })
          .then(function (teams) {
             resolve(teams);
          });
    });
 }
 
 function getById(id) {
    return new Promise(function (resolve, reject) {
       dbPromised
          .then(function (db) {
             var tx = db.transaction("teams", "readonly");
             var store = tx.objectStore("teams");
             console.log();
             return store.get(id);
          })
          .then(function (team) {
             resolve(team);
          }).catch(error => alert(error.message));
    });
 }
 
 function deleteById(id) {
    dbPromised
       .then(function (db) {
          var tx = db.transaction("teams", "readwrite");
          var store = tx.objectStore("teams");
          console.log(id);
          return store.delete(id);
       })
       .then(function (team) {
          M.toast({
             html: 'Berhasil dihapus.'
          })
          console.log("Data berhasil dihapus.");
 
       }).catch(error => alert(error.message));
 }

   //cek team di indexed db
 function checkFavorite(id) {
   return new Promise(function (resolve, reject) {
       dbPromised
           .then(function (db) {
               let tx = db.transaction("teams", "readonly");
               let store = tx.objectStore("teams");
               return store.get(id);
           }).then(function (favorite) {
               if (favorite !== undefined) {
                   resolve(true);
               }
           });
   });
}