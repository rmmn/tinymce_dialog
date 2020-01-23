let editorInstance = null,
    t = null,
    editorTextarea = document.getElementById('mytextarea'),
    options = {},
    rawMessage = null,
    finishMessage = "",
    addOnCancel = false,
    currentRandom = 0,

    cat_page_producer_extend = $(".cat_page_producer_extend").val(),
    site_id = (
        cat_page_producer_extend != null && cat_page_producer_extend != undefined && cat_page_producer_extend != '' ?
        cat_page_producer_extend : ''
    ),

    // Labels and headers for controls.
    params = {
        DialogTitle: "Вставить список товаров",
        VizualizationTitle: "Пример списка",
        Buttons: {
            PrimaryLabel: "Вставить и закрыть",
            CancelLabel: "Отмена"
        },
        Tabs: {
            ManualTitle: "Инструкция",
            GeneralTitle: "Основное",
            ProductsTitle: "Продукты",
            AdditionalsTitle: "Дополнительно"
        },
        initData: {
            site: site_id.toString(),
            id: "shop_products_slider",
            on_page: "3"
        }
    };


// Manual Tab Content
const manualTabItem = [{
    type: 'htmlpanel',
    html: '<h3>Инструкция</p>'
}];

// General Tab Content
const generalTabItems = [{
        type: 'input',
        inputMode: 'number',
        name: 'cat_id',
        placeholder: 'Category ID',
        label: 'Category ID'
    },
    {
        type: 'input',
        inputMode: 'number',
        name: 'pers_cat_id',
        placeholder: 'Personal category ID',
        label: 'Personal category ID'
    },
    {
        type: 'input',
        inputMode: 'number',
        name: 'site',
        placeholder: 'Site ID',
        label: 'Site ID'
    },
    {
        type: 'input',
        inputMode: 'number',
        name: 'collection',
        placeholder: 'Collection ID',
        label: 'Collection ID'
    },
    {
        type: 'input',
        inputMode: 'number',
        name: 'on_page',
        placeholder: 'Number of Slider Items',
        label: 'The number of displayed products in the slider, <br/> the recommended number: 3',
        value: 3,
        maximized: false
    },
    {
        type: 'input',
        inputMode: 'number',
        name: 'start',
        placeholder: 'Start Slider Item',
        label: 'Start Slider Item'
    },
    {
        type: 'checkbox',
        name: 'repeat',
        label: 'Repeat Slider Items'
    },
    {
        type: 'checkbox',
        name: 'button_cart',
        label: 'Show "Add To Cart" Button'
    },
    {
        type: 'checkbox',
        name: 'append',
        label: 'add new data at the end of CSS styles when using the append parameter'
    },
    {
        type: 'htmlpanel',
        html: '<div style="width: 100%; height:20px;"> </div>'
    },
    {
        type: 'checkbox',
        name: 'htmlonly',
        label: 'only a list of products (without javascript and css styles that need to be previously inserted by yourself).'
    },
    {
        type: 'htmlpanel',
        html: '<div style="width: 100%; height:20px;"> </div>'
    },
    {
        type: 'input',
        inputMode: 'number',
        name: 'id',
        placeholder: 'bind ID to the main div.',
        label: 'bind ID to the main div.'
    }
];

// Products Tab Content
const productsTabItems = [{
        type: 'input',
        inputMode: 'number',
        name: 'product_type',
        placeholder: 'Product Type ID',
        label: 'Product Type ID'
    },
    {
        type: 'input',
        inputMode: 'number',
        name: 'producer',
        placeholder: 'Producer ID',
        label: 'Producer ID'
    },
    {
        type: 'checkbox',
        name: 'description',
        label: 'Show Item Description'
    },
    {
        type: 'checkbox',
        name: 'rating_stars',
        label: 'Show Item Star Rating'
    },
    {
        type: 'checkbox',
        name: 'random',
        label: 'Show without ordering by ID'
    },
    {
        type: 'checkbox',
        name: 'bestseller',
        label: 'Show only Bestsellers'
    },
    {
        type: 'checkbox',
        name: 'discount',
        label: 'Show only discounted products'
    },
    {
        type: 'checkbox',
        name: 'sale',
        label: 'Show only promotional items'
    },
    {
        type: 'selectbox',
        name: 'stock',
        label: 'Availability',
        size: 1,
        items: [
            { value: '', text: 'Select One' },
            { value: 'available', text: 'Available' },
            { value: 'unavailable', text: 'Unvailable' },
            { value: 'underorder', text: 'Under the Order' }
        ]
    },
    {
        type: 'checkbox',
        name: 'new_products',
        label: 'Show only new items'
    },
    {
        type: 'checkbox',
        name: 'reduced_price',
        label: 'Show only products marked as Reduced Price'
    },
    {
        type: 'checkbox',
        name: 'recently_viewed_products',
        label: 'Show only Recently Viewed items'
    },
    {
        type: 'input',
        inputMode: 'text',
        name: 'products_synonyms',
        placeholder: 'Product synonyms',
        label: 'Product synonyms'
    },
    {
        type: 'selectbox',
        name: 'order_by',
        label: 'Order by',
        size: 1,
        items: [
            { value: '', text: 'Select One' },
            { value: 'orderByID', text: 'By ID' },
            { value: 'orderByDate', text: 'By Date' },
            { value: 'orderByPrice', text: 'By Price' },
            { value: 'orderByName', text: 'By Name' },

        ]
    },
    {
        type: 'selectbox',
        name: 'sort_by',
        label: 'Sort by',
        size: 1,
        items: [
            { value: '', text: 'Select One' },
            { value: 'asc', text: 'Ascending' },
            { value: 'desc', text: 'Descending' }

        ]
    },
    {
        type: 'input',
        inputMode: 'text',
        name: 'price_from',
        placeholder: 'Price From',
        label: 'Price From'
    },
    {
        type: 'input',
        inputMode: 'text',
        name: 'price_to',
        placeholder: 'Price To',
        label: 'Price To'
    }
];

// Additionals Tab Content
const additionalTabItems = [{
        type: 'input',
        inputMode: 'text',
        name: 'search',
        placeholder: 'Search Query',
        label: 'Search Query'
    },
    {
        type: 'selectbox',
        name: 'lang',
        label: 'Language',
        size: 1,
        items: [
            { value: '', text: 'Select One' },
            { value: 'ua', text: 'Ukrainian' },
            { value: 'ru', text: 'Russian' },
            { value: 'en', text: 'English' }
        ]
    },
    {
        type: 'checkbox',
        name: 'lazy',
        label: 'Accelerated image loading.'
    },
];


// Config Dialog and Data
let dialogConfig = {
    title: params.DialogTitle,
    body: {
        type: 'tabpanel',
        tabs: [{
                name: "manual",
                title: params.Tabs.ManualTitle,
                items: manualTabItem
            },
            {
                name: "general",
                title: params.Tabs.GeneralTitle,
                items: generalTabItems
            },
            {
                name: "products",
                title: params.Tabs.ProductsTitle,
                items: productsTabItems
            },
            {
                name: "additionals",
                title: params.Tabs.AdditionalsTitle,
                items: additionalTabItems
            }
        ]
    },
    buttons: [{
            type: 'cancel',
            name: 'closeButton',
            text: params.Buttons.CancelLabel
        },
        {
            type: 'submit',
            name: 'submitButton',
            text: params.Buttons.PrimaryLabel,
            primary: true
        }
    ],
    initialData: params.initData,

    // On Click to Main Button
    onSubmit: function(api) {
        var data = api.getData();
        var randomID = getRandomInt(0, 1000);
        currentRandom = randomID;
        // Prepare message
        let message = `${
        
        // General section output
        (data.id != '' ? ':' + data.id : '') +
        (data.cat_id != '' ? ':cat_id-' + data.cat_id : '') + 
        (data.pers_cat_id != '' ? ':pers_cat_id-' + data.pers_cat_id : '') + 
        (data.site != '' ? ':site-' + data.site : '') +
        (data.collection != '' ? ':collection-' + data.collection : '') +
        (data.on_page != '' ? ':on_page-' + data.on_page : '') +
        (data.start != '' ? ':start-' + data.start : '') +
        (data.repeat ? ':repeat' : '') +
        (data.button_cart ? ':button_cart' : '') +
        (data.append ? ':append' : '') +
        (data.htmlonly ? ':append' : '') +

        // Product Section output
        (data.product_type ? ':product_type-' + data.product_type : '') +
        (data.producer ? ':producer-' + data.producer : '') +
        (data.description ? ':description' : '') +
        (data.rating_stars ? ':rating_stars' : '') +
        (data.random ? ':random' : '') +
        (data.bestseller ? ':bestseller' : '') +
        (data.discount ? ':discount' : '') +
        (data.sale ? ':sale' : '') +
        (data.stock != '' ? ':stock-'+data.stock : '') +
        (data.new_products ? ':new_products' : '') +
        (data.reduced_price ? ':reduced_price' : '') +
        (data.recently_viewed_products ? ':recently_viewed_products' : '') +
        (data.products_synonyms != '' ? ':products_synonyms-' + data.products_synonyms : '') +
        (data.order_by != '' ? ':order_by-'+data.order_by : '') +
        (data.sort_by != '' ? ':order_by-'+data.sort_by : '') +
        (data.price_from != '' ? ':price_from-' + data.price_from : '') +
        (data.price_to != '' ? ':price_to-' + data.price_to : '') +

        // Additional Section Output
        (data.search != '' ? ':search-' + data.search : '') +
        (data.lang != '' ? ':lang-' + data.lang : '') +
        (data.lazy ? ':lazy' : '')
      }`;

        // Write data on global variable
        options = data;

        rawMessage = message;
        finishMessage = ` [MENU${message}] `;

        // Add message to editor
        tinymce.activeEditor.execCommand(
            'mceInsertContent',
            false,
            finishMessage
        );

        t = tinymce;

        api.close();
    },
    onCancel: (api) => {
        api.close();
    }
};


//TyniMCE Setup
function OnDialogButtonPressed(editor) {
    editorInstance = editor;
    if (Object.entries(options).length === 0 && options.constructor === Object) {
        editor.windowManager.open(dialogConfig);
    } else {
        editor.windowManager.open(dialogConfig).setData(options);
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

//
// Vizualization
//

// Config Dialog and Data
let visualDialogConfig = {
    title: params.VizualizationTitle,
    body: {
        type: 'panel',
        items: [ // A list of panel components
            {
                type: 'htmlpanel', // A HTML panel component
                html: '<div class="visualItemsAjax"></div>'
            }
        ]
    },
    buttons: [{
        type: 'cancel',
        name: 'closeButton',
        text: params.Buttons.CancelLabel
    }],
    initialData: params.initData,
    onCancel: (api) => {
        api.close();
    }
};

function checkMenuExists() {
    var editorContent = editorInstance.getContent();

    var matches = editorContent.match(/(\[MENU.*\])/g);

    if (matches == null)
        return false;
    else
        return true;
}

function getUriFromMenuLine() {
    var editorContent = editorInstance.getContent();
    var matches = editorContent.match(/(\[MENU.*\])/g);

    let uri = `https://jabra-shop.com/codes/shop/template_menu_generator.php?ajax&j=shop_products_slider&c=${(params.site != null && params.site != '' && params.site != undefined? params.site : '0')}&n=${(params.on_page == null || params.on_page == undefined && params.on_page == "" ? "0" : params.on_page)}&param=${(Array.isArray(matches) ? matches[0] : matches).replace('[MENU', '').replace(']', '')}`;
    return uri;
}

function OnVisualizationPressed(editor) {
    editorInstance = editor;

    if (checkMenuExists() && Object.entries(options).length !== 0) {
        tinymce.activeEditor.execCommand('mcePreview');
        loadContentIntoIframe(options, rawMessage, null, '.tox-navobj');
        console.log('dialog')
    } else if (checkMenuExists() == true && Object.entries(options).length === 0) {
        tinymce.activeEditor.execCommand('mcePreview');
        loadContentIntoIframe(options, rawMessage, getUriFromMenuLine(), '.tox-navobj');
        console.log('string')
    } else {
        editor.windowManager.open(dialogConfig);
    }
}

function loadContent(params, paramsString, url = null, container = ".visualItemsAjax") {
    let uri = `https://jabra-shop.com/codes/shop/template_menu_generator.php?ajax&j=shop_products_slider&c=${(params.site != null && params.site != '' && params.site != undefined? params.site : '0')}&n=${(params.on_page == null || params.on_page == undefined && params.on_page == "" ? "0" : params.on_page)}&param=${paramsString}`;

    $.ajax({
        type: "GET",
        url: url == null ? uri : url
    }).done(function(responseText) {
        $(container).append(responseText);
    });
}

function loadContentIntoIframe(params, paramsString, url = null, container = ".visualItemsAjax") {
    let uri = `https://jabra-shop.com/codes/shop/template_menu_generator.php?ajax&j=shop_products_slider&c=${(params.site != null && params.site != '' && params.site != undefined? params.site : '0')}&n=${(params.on_page == null || params.on_page == undefined && params.on_page == "" ? "0" : params.on_page)}&param=${paramsString}`;

    $.ajax({
        type: "GET",
        url: url == null ? uri : url
    }).done(function(responseText) {
        $(container).find('iframe').contents().find('#tinymce').append(responseText);
    });
}

function previewClick(event, editor) {
    editorInstance = editor;
    if (checkMenuExists() && Object.entries(options).length !== 0) {
        loadContentIntoIframe(options, rawMessage, null, '.tox-navobj');
    } else if (checkMenuExists() == true && Object.entries(options).length === 0) {
        loadContentIntoIframe(options, rawMessage, getUriFromMenuLine(), '.tox-navobj');
    } else {
        return;
    }
}