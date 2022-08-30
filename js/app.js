var app = {
    tableImages: [
        '0 -100px', '0 -200px',  '0 -300px', '0 -400px', '0 -500px', '0 -600px', '0 -700px', '0 -800px', '0 -900px', '0 -1000px', '0 -1100px', '0 -1200px', '0 -1300px', '0 -1400px', '0 -100px', '0 -200px', '0 -300px', '0 -400px', '0 -500px', '0 -600px', '0 -700px', '0 -800px', '0 -900px', '0 -1000px', '0 -1100px', '0 -1200px', '0 -1300px', '0 -1400px',
      ],
      indexTableImages: 0,
    init: function() {
      //compteur
      app.clock();
      //génération du plateau
      app.shuffle();
    },

    // Fonction compteur
    clock: function() {
      var counter = 0;
        setInterval(function() {
          counter++;
          console.log(counter);
          if (counter > 60) {
            alert('Vous avez perdu temps écoulé!');
            location.reload();
          }
          $('.red-box').animate({
            width: "+=10"
          })
        }, 1000);
    },

    // Mélange des images
    shuffle: function() {
      var random = 0;
      var temp = 0;
      for (i = 1; i < app.tableImages.length; i++) {
        random = Math.round(Math.random() * i);
        temp = app.tableImages[i];
        app.tableImages[i] = app.tableImages[random];
        app.tableImages[random] = temp;
      }
      //génération et assignation des cartes
      app.assignCards();
      console.log('Shuffled Card Array: ' + app.tableImages);
    },
    assignCards: function() {
      //création du plateau
      app.createTable();

      // On exécute la fonction showCard
      $('.cache').on('click', app.showCard);
    },

    
     // Fonction qui créer le tableau contenant toutes les cases
     createTable: function() {
      app.table = $("<table>");
      $('#plateau').append(app.table);
      // on créer 4 
      for (var line = 0; line < 4; line++) {
        app.createLine();
      }
    },

    createLine: function() {
      var tr = $('<tr>');
      for (var column = 0; column < 7; column++) {
        // On crée un <td>
        var td = $('<td>');
        td.addClass('carte');
        td.append("<div class='cache'>");
        td.append("<div class='image unmatched'>")
        td.children('.image').css("background-position", app.tableImages[app.indexTableImages]);
        td.children('.image').attr('data-card-value', app.tableImages[app.indexTableImages]);
        app.indexTableImages++;
        tr.append( td );
      }
   
    app.table.append( tr );
    },


    showCard: function() {
        console.log('click');
        // On supprime le .cache cliquée
        $(this).hide();
        // On affiche l'image
        $(this).next(".image").show();
        // On ajoute une classe ".selected" au clique, pour indiqué que cette image est séléctionnée
        $(this).next(".image").addClass("selected");
        // vérification des cartes affichées
        app.checkMatch();
    },

   
    checkMatch: function() {
      
      if ($('.selected').length === 2) {
      
        if ($('.selected').first().data('cardValue') == $('.selected').last().data('cardValue')) {
        
          $('.selected').each(function() {
            $(this).show().removeClass('unmatched');
          });
        
          $('.selected').each(function() {
            $(this).removeClass('selected');
          });

          
          app.checkWin();
        } else {
          
          $('.cache').off('click', app.showCard);
          setTimeout(function() {
            $('.selected').each(function() {
              $(this).hide().removeClass('selected');
              $(this).prev('.cache').show().removeClass('selected');
            });
           
            $('.cache').on('click', app.showCard);
          }, 1000);
        }
      }
    },

    // Fonction permettant de vérifier si le jeu est gagné,
    checkWin: function() {
      if ($('.unmatched').length === 0) {
        // On alerte le joueur qu'il a gagné et on rafraichit la page
        alert("Tu as gagné!");
        location.reload();
      }
    },

  };
  $(app.init);
  