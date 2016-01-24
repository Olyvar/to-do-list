var toDoListApp = {

	// VARIABLES
	jsBtn: "<a class='small-btn btn pull-right js-delete delete-btn' href='#'>Delete</a> <a class='small-btn btn pull-right js-mark-as-complete' href='#'>Mark as Complete</a>",
	allGood : true,
	completedItems: [],
	totalItemsCount: 0,
	completedItemsCount: 0,

	init: function(){
		this.cacheSelectors(true);
		this.bindEvents(true);
	},

	cacheSelectors: function (onInit) {
		if(onInit) {
			this.toDoList = document.querySelector(".js-to-do-list");
			this.addBtn = this.toDoList.querySelector(".js-add");
			this.myToDos = this.toDoList.querySelector(".js-my-todos");
			this.mainInput = this.toDoList.querySelector(".js-main-input");
			this.totalItemsSpan = this.toDoList.querySelector(".js-total-items");
			this.completedItemsSpan = this.toDoList.querySelector(".js-completed-items");
			this.completedItemsList = this.toDoList.querySelector(".js-my-completed-items");
		} else {
			// elements not available until created
			this.markAsCompleteBtn = this.toDoList.querySelector(".js-mark-as-complete");
			this.deleteBtn = this.toDoList.querySelector(".js-delete");
		}
	},

	bindEvents: function(onInit){
		if(onInit) {
			this.addBtn.addEventListener("click", this.addToDoItem.bind(this));
			this.mainInput.addEventListener("keydown", this.checkEnter.bind(this));
		} else{
			// elements not available until created
			this.markAsCompleteBtn.addEventListener("click", this.markAsComplete.bind(this));
			this.deleteBtn.addEventListener("click", this.deleteItem.bind(this));
		}
	},

	checkEnter: function(e){
		// handles hitting enter on the input
		if(e.keyCode === 13 || e.which === 13){
			this.addToDoItem(e);
		}
	},

	validation: function(input){
		if(input.value === "") {
			input.classList.toggle("error");
			// Set Timeout to remove error class after 1 second
			setTimeout(function(){
				input.classList.toggle("error");
			}, 1000);
			// Set variable to false, so we can return out of the 'addToDo' function
			this.allGood = false;
		} else {
			this.allGood = true;
		}
	},

	addToDoItem: function(e){

		e.preventDefault();

		this.validation(this.mainInput);

		// if validation function has set allGood variable to false, return out of the function
		if(!this.allGood){
			return false;
		}

		// build item
		this.buildToDoItem();
		// render to page
		this.renderToDoItem();
		// increment total items counter
		this.incrementTotalItems();
		// select new button elements and cache them
		this.cacheSelectors(false);
		// bind new listeners to new elements
		this.bindEvents(false);

	},

	buildToDoItem: function(){
		// Create new Li element each time button is clicked, add buttons to li
		this.li = document.createElement("li");
		this.li.innerHTML = this.jsBtn + "<span class='js-value'>" + this.mainInput.value + "</span>";
	},

	renderToDoItem: function(){
		// Prepend (insert before the first child of the ul, which will always be the latest li element) new Li element to UL, then fill it with the value of the input field
		this.myToDos.insertBefore(this.li, this.myToDos.firstChild);
		// Reset input
		this.mainInput.value = "";
	},

	incrementTotalItems: function(){
		// function that increments total item counter and prints to page
		this.totalItemsCount++;
		this.totalItemsSpan.innerHTML = this.totalItemsCount;
	},

	incrementCompletedItems: function(){
		// increment completed item count and print to page
		this.completedItemsCount++;
		this.completedItemsSpan.innerHTML = this.completedItemsCount;
	},

	deleteItem: function(e){
		e.target.parentNode.remove();
	},

	markAsComplete: function(e){
		this.incrementCompletedItems();
		// push the 'text' of the completed item to an array
		this.completedItems.push(e.target.parentNode.querySelector(".js-value").innerHTML);
		// add completed css class name to to-do-list item
		e.target.parentNode.className = "completed";
		// add text from completed items array to list. Slice method is used so the last item in the array is grabbed and returned
		this.completedItemsList.innerHTML += "<li>" + this.completedItems.slice(-1)[0] + "</li>";
		e.target.remove();
	}

};

toDoListApp.init();