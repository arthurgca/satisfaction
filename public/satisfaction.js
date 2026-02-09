/**
 *
 * @param root_doc
 * @param default_value
 */
function plugin_satisfaction_load_defaultvalue(root_doc, default_value) {
    var value = $('input[name="default_value"]').val();

    if (value > default_value) {
        value = default_value;
    }

    $.ajax({
        url: root_doc + '/ajax/satisfaction.php',
        type: 'POST',
        data: '&action_default_value&default_value=' + default_value + '&value=' + value,
        dataType: 'html',
        success: function (code_html, statut) {
            $('#default_value').html(code_html);
        },

    });
}

/**
 * Reposiciona e alinha as perguntas extras do plugin satisfaction
 */
$(document).ready(function () {
    // Encontrar o campo hidden que identifica as perguntas do plugin
    var surveyIdField = $('input[name="plugin_satisfaction_surveys_id"]');

    if (surveyIdField.length > 0) {
        // Encontrar todas as perguntas extras (rows que vêm depois do campo hidden)
        var extraQuestions = surveyIdField.nextAll('.row.mb-2');

        // Encontrar a primeira pergunta nativa (Satisfaction with the resolution)
        var firstNativeQuestion = $('.row.mb-2').filter(function () {
            return $(this).find('label').text().includes('Satisfaction with the resolution') ||
                $(this).find('label').text().includes('Satisfação com a resolução');
        }).first();

        if (firstNativeQuestion.length > 0 && extraQuestions.length > 0) {
            // Mover as perguntas extras para antes da primeira pergunta nativa
            extraQuestions.each(function () {
                $(this).insertBefore(firstNativeQuestion);
            });

            // Mover o campo hidden também
            surveyIdField.insertBefore(firstNativeQuestion);
        }
    }
});
