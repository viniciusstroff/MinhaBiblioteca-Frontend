


var app  = angular.module('app', [
    'components', 'ngRoute'
]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    
    
    $routeProvider
        .when('/books',{
            templateUrl:'index.html',
            controller: "BooksController"
        })
        .when('/create',{
            templateUrl:'create.html',
            controller: "BooksController"
        })
        .when('/favorites',{
            templateUrl:'../favorites/favorites.html'
        })
        .when('/show',{
            templateUrl:'show.html',
            controller: "BooksController"
        })
}]);




function getRows(breakpoint,data) {
    var len = data.length; var i = 0;
    var rows = []; var temp = [];
    for (; i < len; i++) {
        if (i % breakpoint == 0 && i != 0) {
            rows.push(temp);               
            temp = [];
        } 
        temp.push(data[i]);
    }
    var len2 = rows.length * breakpoint;
    if (len > len2) {
        //var leftOvers = len - len2;
        i = len2; temp = [];
        for (; i < len; i++) {
            temp.push(data[i]);
        }
        rows.push(temp);
    }

    return rows;
}

app.controller('BooksController', function($scope, $http, $location, booksService){
    $scope.books = [];
    $scope.messages=[];


    $scope.addBook = function (book) {
        
       

        if(messages = booksService.validateBookFields(book))
           return $scope.messages = messages
        
 
        if(lastBook = booksService.getLastBook())
            book.id = lastBook.id +1;
          

        $scope.books = book;

        booksService.addData($scope.books);
        
        return window.location.href = "index.html";
    }

    $scope.getBook = function (id) {
        $scope.book = booksService.getBookById(id)
        // return window.location.href = `show.html?id=${id}`;
    }

    if(!booksService.getData().length){

        $http.get('../data/books.json').then(function(response){
            
            for (let index = 0; index <response.data.length; index++) {
                booksService.addData(response.data[index]);
            }

            $scope.books = booksService.getData();
            $scope.rows=getRows(3, $scope.books)
            
        }),function(error){
            console.log(error);
        }

    }
    $scope.books = booksService.getData();
    $scope.rows=getRows(3, $scope.books)

    
});



app.service('booksService', function($window) {

    const KEY = 'books';

    const addData = function(newObj) {
        let mydata = $window.localStorage.getItem(KEY);
        if (mydata) {
            mydata = JSON.parse(mydata);
        } else {
            mydata = [];
        }
        mydata.push(newObj);
        $window.localStorage.setItem(KEY, JSON.stringify(mydata));
    };

    const getData = function(){
        let mydata = $window.localStorage.getItem(KEY);
        if (mydata) 
            mydata = JSON.parse(mydata);
        
        return mydata || [];
    };

    const getLastBook = function(){
        let mydata = $window.localStorage.getItem(KEY);
        if (mydata) 
            mydata = JSON.parse(mydata);
        
        return mydata[mydata.length-1] || [];
    };

    const getBookById = function(id){
        let mydata = $window.localStorage.getItem(KEY);
        if (mydata) 
            mydata = JSON.parse(mydata);
        
        const book = mydata.filter(function (book) {
            return book.id == id;
        });
    
        return book[0];
    };

    const validateBookFields = function(book){
        let messages = []
        if(!book){
            messages.push('Preencha os campos obrigatorios')
            return messages
        }
        if(!book.title) messages.push('Campo Titulo é obrigatório')
        if(!book.genre) messages.push('Campo Genero é obrigatório')
        if(!book.publisher) messages.push('Campo Editora é obrigatório')
        if(!book.author) messages.push('Campo Autor é obrigatório')
        if(!book.image)messages.push('Campo Imagem é obrigatório')
        if(book.resume && book.resume.length > 250)messages.push('Campo Resumo deve possuir no máximo 250 caracteres')

        if(messages.length >0)
            return messages
        return false
    }

    return {
        addData: addData,
        getData: getData,
        getLastBook: getLastBook,
        validateBookFields:validateBookFields,
        getBookById: getBookById
    };
});


app.controller('BookController', function($scope, $http, $location, booksService){
    
    // window.location.href

    const queryString = window.location.search;
    
    const urlParams = new URLSearchParams(queryString);
    const bookId= urlParams.get('id');

    $scope.book = booksService.getBookById(bookId)
   
    // $scope.getBook = function (id) {
    //     $scope.book = booksService.getBookById(id)
    //     // return window.location.href = `show.html?id=${id}`;
    // }

    
});








