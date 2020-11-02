angular.module('components', [])
 
  .directive('menuComponent', function() {
    return {
      restrict: 'E',
      transclude: true,
      $scope:{},
      template:
      `<nav class="white-text " >
        
        <div class="row">
            <div class="nav-wrapper col s12 m12">
                <a href="#" class="brand-logo col left image-hover"><img src="../images/logo.png" height="80vh"></a>   
                <ul class=" right">               
                    <li>    
                        <div class=" row center ">
                            <div class="col " >
                                <div class="row ">
                                    <div class="input-field col ">
                                        <i class=" material-icons prefix white-text"  >search</i>
                                        <input type="text" placeholder="Procurar" ng-model="search" id="autocomplete-input" class="autocomplete white-text "  style="color: white;">
                                    </div>
                                </div>
                            </div>
                        </div>          
                    </li>                     
                    <li><a href="../books/index.html">Livros</a></li>
                    <li><a href="../books/create.html">Cadastro de Livros</a></li>
                </ul>
            </div>
        </div>
      </nav>`,
      controller: function MenuController() {
        // let search = $scope.search = "abc"
        // console.log(this.search)
        // this.search = "Some local variables of dependency";
        // this.childComponentParams = [{
        //   name: "child1"
        // }, {
        //   name: "child2"
        // }];
      },
      replace: true
    };
  })
  
 
  .directive('footerComponent', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {  },
      // link: function(scope, element, attrs, tabsController) {
      //   tabsController.addPane(scope);
      // },
      template:
        `
          <div class="footer-copyright">
            <div class="container">
            
              <div class="col l6 s6 ">
                  
                  <ul>
                      <li class="left">© 2020 Desenvolvido por Vinicius Hoffmann Stroff</li>
                      <li class="space-between right">
                          <a class="white-text" target="_blank" href="https://www.linkedin.com/in/viniciusstroff/">Linkedin</a>
                          <a class="white-text" target="_blank" href="https://www.facebook.com/vinicius.hoffmannstroff">Facebook</a>
                          <a class="white-text" target="_blank" href="https://www.instagram.com/sr.stroff/?hl=en">Instagram</a>
                      </li>
                  </ul>
              </div>

            </div>
            
          </div>
        `,
      replace: true
    };
  })


  .directive('bookForm', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {  },
      
      template:
        `
          <div class="row">
            <div class="input-field col s6">
              <i class="material-icons prefix">account_circle</i>
              <input id="icon_prefix" type="text" class="validate">
              <label for="icon_prefix">First Name</label>
            </div>
            <div class="input-field col s6">
              <i class="material-icons prefix">phone</i>
              <input id="icon_telephone" type="tel" class="validate">
              <label for="icon_telephone">Telephone</label>
            </div>
          </div>
        `,
      replace: true
    };
    
  })
  .directive('messages', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {  },
      // link: function(scope, element, attrs, tabsController) {
      //   tabsController.addPane(scope);
      // },
      template:
        `
        <div>
          <menu-component></menu-component>
        </div>
        `,
      replace: true
    };
  })


  