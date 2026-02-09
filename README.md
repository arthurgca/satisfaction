# Plugin Satisfaction para GLPI

Este plugin estende a pesquisa de satisfação nativa do GLPI, permitindo adicionar perguntas personalizadas ao formulário de satisfação.

## Funcionalidades

* Diferentes pesquisas (uma para cada entidade)
* Múltiplos tipos de perguntas:
  - Sim / Não (dropdown)
  - Texto livre (textarea)
  - Avaliação por estrelas (configurável de 2 a 10 estrelas)
* Compatível com interface central e interface simplificada (self-service) do GLPI 11
* Suporte a traduções multi-idioma
* Tags personalizadas para notificações

## Compatibilidade

- **GLPI**: 11.0 - 12.0
- **Versão do Plugin**: 1.7.2

## Instalação

### Via Docker

```bash
# Copiar plugin para o container
docker cp . <nome-container-glpi>:/var/www/glpi/plugins/satisfaction

# Ajustar permissões
docker exec -u root <nome-container-glpi> chown -R www-data:www-data /var/www/glpi/plugins/satisfaction
```

### Instalação Manual

1. Extrair o plugin na pasta `/var/www/glpi/plugins/satisfaction`
2. Ajustar permissões: `chown -R www-data:www-data /var/www/glpi/plugins/satisfaction`
3. Acessar GLPI → **Configurar** → **Plugins**
4. Clicar em **Instalar** e depois **Ativar**

## Configuração

### 1. Criar uma Pesquisa

1. Acesse: **Administração** → **More satisfaction**
2. Clique em **Adicionar**
3. Configure:
   - **Nome**: Nome da pesquisa
   - **Entidade**: Selecione a entidade
   - **Ativo**: Sim
   - **Recursivo**: Sim/Não (para entidades filhas)

⚠️ **Importante**: Apenas UMA pesquisa ativa por entidade é permitida.

### 2. Adicionar Perguntas

1. Na pesquisa criada, vá na aba **"Questions"**
2. Clique em **"Add a question"**
3. Configure cada pergunta:
   - **Pergunta**: Texto da pergunta
   - **Tipo**: Sim/Não, Texto ou Nota (estrelas)
   - **Comentário**: Descrição opcional
   - Para tipo "Nota": configure o número de estrelas (2-10)

### 3. Configurar Permissões

1. Vá em: **Administração** → **Perfis**
2. Selecione o perfil desejado
3. Vá na aba **"More satisfaction"**
4. Marque as permissões apropriadas

## Uso

Quando um chamado é fechado e a pesquisa de satisfação é enviada:

1. O usuário recebe o link da pesquisa por e-mail
2. Ao acessar, verá as perguntas nativas do GLPI + as perguntas extras configuradas
3. As respostas são salvas automaticamente ao clicar em "Save"
4. As respostas podem ser visualizadas na aba "Answers" da pesquisa

## Tags para Notificações

O plugin adiciona duas tags personalizadas para notificações:

- `##satisfaction.question##`: Lista todas as perguntas extras
- `##satisfaction.answer##`: Lista todas as perguntas e respostas

## Alterações para GLPI 11

Este plugin foi atualizado para funcionar corretamente com o GLPI 11, incluindo:

- ✅ Suporte à interface simplificada (self-service/helpdesk)
- ✅ Hooks modernos (`pre_item_form` e `post_item_form`)
- ✅ Formatação responsiva compatível com Bootstrap 5/Tabler
- ✅ JavaScript carregado em ambas as interfaces

## Desenvolvimento

### Estrutura de Arquivos

```
satisfaction/
├── src/
│   ├── Survey.php              # Gerenciamento de pesquisas
│   ├── SurveyQuestion.php      # Gerenciamento de perguntas
│   ├── SurveyAnswer.php        # Exibição e salvamento de respostas
│   ├── SurveyTranslation.php   # Traduções
│   └── ...
├── front/                      # Páginas de interface
├── ajax/                       # Endpoints AJAX
├── install/                    # Scripts de instalação/atualização
├── locales/                    # Arquivos de tradução
├── setup.php                   # Configuração e hooks do plugin
└── hook.php                    # Funções de instalação/desinstalação
```

### Banco de Dados

O plugin cria as seguintes tabelas:

- `glpi_plugin_satisfaction_surveys`: Pesquisas
- `glpi_plugin_satisfaction_surveyquestions`: Perguntas
- `glpi_plugin_satisfaction_surveyanswers`: Respostas dos usuários
- `glpi_plugin_satisfaction_surveytranslations`: Traduções
- `glpi_plugin_satisfaction_surveyreminders`: Lembretes automáticos

## Licença

GPLv2+

## Autores

- [Infotel](https://blogglpi.infotel.com)
- Xavier CAILLAUD

## Links

- [GitHub](https://github.com/pluginsGLPI/satisfaction)
- [Transifex](https://www.transifex.com/InfotelGLPI/GLPI_satisfaction) (Traduções)
