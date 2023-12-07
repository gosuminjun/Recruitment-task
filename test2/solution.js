// 여기에 정답을 작성해주세요

// 1
document.getElementById("target-1").classList.remove("border");

// 2
document.getElementById("target-1").style.left = "250px";

// 3
var target2Elements = document.querySelectorAll(".target-2");
target2Elements.forEach(function (element) {
  element.classList.remove("border");
  element.classList.add("blue");
});

// 4
target2Elements.forEach(function (element) {
  element.style.left = "50px";
  element.style.marginTop = "-15px";
});

// 5
var target3Element = document.getElementById("target-3");
target3Element.style.transition = "opacity 1s";
target3Element.style.opacity = 0;

target3Element.addEventListener("transitionend", function () {
  var target4Element = document.getElementById("target-4");
  target4Element.classList.add("green");
  target3Element.style.transition = ""; // Reset transition property
});

// 아래 코드는 수정하지 않습니다

// 1
$("#target-1").removeClass("border");

// 2
$("#target-1").css("left", "250px");

// 3
$(".target-2").removeClass("border").addClass("blue");

// 4
$(".target-2").css({ left: 50, "margin-top": "-15px" });

// 5
$("#target-3").fadeOut(() => $("#target-4").addClass("green"));
