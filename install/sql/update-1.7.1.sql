UPDATE `glpi_displaypreferences` SET `itemtype` = 'GlpiPlugin\\Satisfaction\\Survey' WHERE `itemtype` = 'PluginSatisfactionSurvey';
DELETE FROM `glpi_crontasks` WHERE `itemtype` LIKE 'PluginSatisfaction%';
