// принимает фукнцию которая открывает модальное окно
export default function formInit(modalOpen) {
  //только в этом файле для упращения ajax используется jquery (его нужно переписать на нативный js)

  let submitForm = e => {
    e.preventDefault();
    let form = $(e.target);
    let data = $(e.target).serialize();
    let url = form.attr("action");
    console.log(form);
    console.log(data);
    console.log(url);

    let req = $.ajax("order.php", {
      type: "POST",
      url: url,
      data: data,
      dataType: "JSON"
    });

    req.done(response => {
      console.log("in done");
      let message = response.message,
        status = response.status;
      //отправка сообщения в модальное окно
      modalOpen(".modal__form", response.status, response.message);
      //отчистка формы
      document.getElementById("order-form").reset();
    });

    req.fail(function(jqXHR, textStatus) {
      alert("request failed: " + textStatus);
    });
  };

  $("#order-form").on("submit", submitForm);
}
