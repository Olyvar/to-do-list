	( function(){

		// VARIABLES

		var addBtn 				= document.querySelector(".js-add"),
			myToDos 			= document.querySelector(".js-my-todos"),
			mainInput 			= document.querySelector(".js-main-input"),
			totalItemsSpan 		= document.querySelector(".js-total-items"),
			completedItemsSpan 	= document.querySelector(".js-completed-items"),
			completedItemsList 	= document.querySelector(".js-my-completed-items"),
			deleteBtn 			= document.querySelector(".js-delete"),
			jsButtons	 		= "<a class='small-btn btn pull-right js-delete delete-btn' href='#'>Delete</a> <a class='small-btn btn pull-right js-mark-as-complete' href='#'>Mark as Complete</a>",
			completedItemsCount	= 0,
			totalItemsCount 	= 0,
			completedItems 		= [],
			allGood				= true;



		// FUNCTIONS

		// Simple Validation
		var validation = function(input){
			if(input.value === "") {
				input.classList.toggle("error");
				// Set Timeout to remove error class after 1 second
				setTimeout(function(){
					input.classList.toggle("error");
				}, 1000);
				// Set variable to false, so we can return out of the 'addToDo' function
				allGood = false;
			} else {
				allGood = true;
			}
		}

		// Main Function
		var addToDoItem = function(e){
			// Prevent button's default behaviour
			e.preventDefault();
			validation(mainInput);
			// if validation function has set allGood variable to false, return out the function
			if(allGood === false){
				return false;
			}

			addAndShowTotalItems();
			// Create new Li element each time button is clicked, add buttons to li
			var li = document.createElement("li");
			li.innerHTML = jsButtons + "<span class='js-value'>" + mainInput.value + "</span>";

			// Prepend (insert before the first child of the ul, which will always be the latest li element) new Li element to UL, then fill it with the value of the input field
			myToDos.insertBefore(li, myToDos.firstChild);
			// Reset input
			mainInput.value = "";
			// Select mark as complete button
			var markAsCompleteBtn = document.querySelector(".js-mark-as-complete");
			var deleteBtn = document.querySelector(".js-delete");
			// Add event listener to button
			markAsCompleteBtn.addEventListener("click", function(e){
				markAsComplete(e);
			});

			deleteBtn.addEventListener("click", function(e){
				deleteItem(e);
			})
		}

		var addAndShowTotalItems = function(){
			// function that increments total item counter and prints to page
			totalItemsCount++;
			totalItemsSpan.innerHTML = totalItemsCount;
		}

		var markAsComplete = function(e){
			// increment completed item count and print to page
			completedItemsCount++;
			completedItemsSpan.innerHTML = completedItemsCount;
			// push the 'text' of the completed item to an array
			completedItems.push(e.target.parentNode.querySelector(".js-value").innerHTML);
			// add completed css class name to  to-do-list item
			e.target.parentNode.className = "completed";
			// add text from completed items array to list. Slice method is used so the last item in the array is grabbed and returned
			completedItemsList.innerHTML += "<li>" + completedItems.slice(-1)[0] + "</li>";
		}

		var deleteItem = function(e){
			// remove item
			e.target.parentNode.remove();
		}

		// EVENTS

		addBtn.addEventListener("click", function(e) {
			addToDoItem(e);
		});

		mainInput.addEventListener("keydown", function(e) {
			// handles hitting enter on the input
			if(e.keyCode === 13 || e.which === 13){
				addToDoItem(e);
			}
		});



	}() );
