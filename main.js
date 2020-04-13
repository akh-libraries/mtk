  

  var body = $('body'),
      map_overflow_wrap = $('#map_overflow_wrap'),
      map_wrap = $('#map_wrap'),
      map = $('#map'),
      map_zoom_wrap = $('#map_zoom_wrap'),
      measure_wrap = $('#measure'),
      count_wrap = $('#count'),
      spinner = $('.spinner'),
      map_scale = $('#map_scale'),
      vr_objects = $('#vr_objects'),
      multiplier = $('#multiplier'),
      projects_wrap = $('#projects_wrap'),
      middle_point = $('#center_point'),
      menu = $('#menu'),
      options = $('#options'),
      close_options_button = $('#close_options');

  var map_size = 0.02,
      map_irl_width = 100,
      map_irl_height = 100,
      image_rotation = 0,
      def_ground = 12.50,
      def_bottom = 11.50,
      def_rock = 7.50,
      map_wrap_width = map_wrap.width(),
      zoomer = 1,
      scale_factor = 2,
      remember_top,
      remember_left,
      posX,
      posY,
      orig_size,
      multiplier_val = multiplier.val();

  window.addEventListener('resize', function(event){
    layout();
    recalc();
  });

  function layout() {
    var wW = $(window).width();
    var ncW = wW - 420;
    
    if(wW > 1080){
      ncW = wW - 440;
    } else {
      ncW = wW - 220;  
    }
    
    map_overflow_wrap.css({'width': ncW});
  }


// <---------- missing html from layout
$('.obj_eraser').attr('data-warning_msg', 'Huom. Olet poistamassa kaivoja!');
$('#options').after('<a href="#" id="release_hook">Vapauta</a>');

$('#map_inputs').prepend('<a href="#" class="map_btn instructions">ohjeet</a><a href="#" class="map_btn calculations">laskelmat</a>');
$('#map_inputs').append('<a href=href="#" class="map_btn" id="send_codes">Lähetä kaivot ccs:ään</a>');

var inst = '<div><section>'+
        '<h3><span class="mouse_icon"></span>Käytätkö hiirtä?</h3>'+
        '<p>Karttaa liikutetaan / objekteja siirretään pitämällä hiiren vasenta näppäintä pohjassa</p>'+
        '<p>Oikean napin painallus lisää kartalle objektin / avaa objektin valikon</p>'+
        '<p>Rullalla zoomaillaan</p>'+
      '</section>'+
      '<section>'+
        '<h3><span class="touch_icon"></span>Käytätkö kosketusnäyttöä?</h3>'+
        '<p>Pitkä painallus lisää kartalle objektin</p>'+
        '<p>Objektia voit liikuttaa tuplapainamalla sitä</p>'+
      '</section>'+
      '<section class="import_csv">'+
        '<h3>csv placeholder</h3>'+
        '<input type="file" id="csv_upload" />'+
      '</section>'+
      '</div>';

map_overflow_wrap.prepend('<a href="#" class="fullscreen_button"><span></span></a>');

$('#send_codes').after('<div id="code_warnings"></div>');
$('#counts').after('<div id="inst"><a href="#" class="close_pop">x</a>'+inst+'</div>');
$('#counts').append('<a href="#" class="close_pop">x</a>');
$('.spinner').after('<a href="#" class="warning active"><span class="screen_arrow">&#10554;</span><span class="screen_w"></span><span class="screen_h"></span></a>');
  
// -------------->


  $(document).on('click', '.calculations', function (event) {
    $('#counts').addClass('active');
  }); 

  $(document).on('click', '.instructions', function (event) {
    $('#inst').addClass('active');
  });

  $(document).on('click', '.close_pop', function (event) {
    $('#inst, #counts').removeClass('active');
  });

  $(document).on('click', '.menu_toggle', function(e) {
    e.preventDefault();
    $('#menu').toggleClass('closed');
	});

  function recalc_distances() {
    var map_orig_piece = map_scale.attr('data-irl_width') || 100;
    map_irl_width = map_orig_piece * map_scale.val() / 100;
    map_size = map_irl_width / map.width();
    recalc();
  }
  
  $(document).on('input', '#object_scale', function (event) {
    scale_factor = $(this).val();
    rescale();
  });
  
  $(document).on('input', '#map_scale', function (event) {
    recalc_distances();
  });
  
  $(document).on('input', '#multiplier', function (event) {
    multiplier_val = multiplier.val();
    recalc_distances();
  });
  

  $('.load_pdf_image').on('click',function(e){
    e.preventDefault();
    $('#load_pdf').trigger('click');
  });
  
	map.mousedown(function(e) {
    if (e.which === 3) {
      posX = map.offset().left,
      posY = map.offset().top;

      remember_top = (e.pageY - posY)/zoomer;
      remember_left = (e.pageX - posX)/zoomer;
    }
  });
  
  
$('#map_overflow_wrap, #vr_wrap').on('mousewheel DOMMouseScroll', function (e) {
    var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;

    this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
    e.preventDefault();
});
  
  
	$(document).on('input change', '.details input, .details select', function () {

    var field = $(this);
    var cur_value = field.val();
    
    if(field.hasClass('num_field')){
      cur_value = cur_value.replace(/[^0-9\.]/g,'');
      cur_value = cur_value.replace(',', '.').replace(/[^\d\.]/g, "").replace(/\./, "x").replace(/\./g, "").replace(/x/, ".");
      field.val(cur_value);
    }
    

    if(field.is('select')){
      field.find('option').removeAttr('selected');
      field.find('option[value="'+cur_value+'"]').attr('selected','selected').prop('selected',true);
    } else {
      field.attr('value', cur_value);
    }
    
      menu_to_source($('.object.active'));
      recalc();
	});


	$(document).on('click', '.rot_pdf_left, .rot_pdf_right', function(e) {
		e.preventDefault();
		var clicked = $(this);
    
    if(clicked.is('.rot_pdf_left')){
      image_rotation = image_rotation - 90;
    } else if(clicked.is('.rot_pdf_right')){
      image_rotation = image_rotation + 90;
    }


    
	});
    

var element = document.querySelector('#map_zoom_wrap');
var zoom_tick = 0.2;


var instance = panzoom(element, {
  zoomSpeed: zoom_tick,
  zoomDoubleClickSpeed: 1, 
  maxZoom: 30,
  minZoom: 0.1,
  smoothScroll: false,
  onDoubleClick: function(e) {
    return false;
  },
  onTouch: function(e) {
    return false;
  }
});

instance.on('zoom', function(e) {
  zoomer = instance.getTransform().scale;
  rescale();
});
  
  function rescale() {
    $('.object').each(function() {
      var modifying = $(this);
      modifying.css('transform','scale('+scale_factor/zoomer+','+scale_factor/zoomer+')');
    });
    setTimeout(function(){recalc_distances();}, 200);
  }


  $(document).on('click', '.fullscreen_button', function (event) {
    map_overflow_wrap.toggleClass('full');
    
    var map_offset_y = ((map_overflow_wrap.height() - map_zoom_wrap.height()*zoomer)/2),
        map_offset_x = ((map_overflow_wrap.width() - map_zoom_wrap.width()*zoomer)/2);
        
        instance.moveTo(map_offset_x, map_offset_y);
        recalc();
  }); 

	$(document).on('input', '.default_ground_val, .default_bottom_val', function (event) {
    var modding = $(this);
    var cur_val = modding.val();

      if(modding.hasClass('default_ground_val')){
        def_ground = cur_val;
      }

      if(modding.hasClass('default_bottom_val')){
        def_bottom = cur_val;
      }
    
      recalc();
	});
  
  
  
	$(document).on('click', '.connect span', function(e) {
    e.preventDefault();
    
    var clicked = $(this);
    var obj = $(this).parents('.object');
    var active_wrap = $('.object.active');

    //prevent mix
    
    if(clicked.hasClass('connect_txt')){
      
      if(e.target != this) return;


      if(e.which === 1){

        var obj_id_full = obj.attr('data-id_full');
        

        if(!obj.hasClass('active')){

          var active_id_full = active_wrap.attr('data-id_full');
          var current_outlets = active_wrap.attr('data-target');
          var check_connection = obj.find('.outlet_wrap div[data-target="'+active_id_full+'"]')


          if (current_outlets.indexOf(obj_id_full) == -1 && check_connection.length == 0){
            
            if(current_outlets == ''){
              current_outlets = obj_id_full;
            } else {
              current_outlets = current_outlets+','+ obj_id_full;
            }

            active_wrap.attr('data-target', current_outlets);

            options.find('.details_out_direction').attr('value', obj_id_full);
            
          }
          
          if(!$('.obj_eraser').hasClass('active')){body.removeClass('message').attr('data-message', '')}
          
        }
      }
      
    } else {

        var target_obj = active_wrap.attr('data-target');
        var obj_id_full = obj.attr('data-id_full');
        
        if(target_obj.includes("gst")){

            $('.ghost[data-sources^="'+obj_id_full+'"]').remove();
        }

        active_wrap.attr('data-target', '');
      
    }
    
    recalc();
    create_menu_from_source($('.object.active'));
	});




	var timestamp = 0;

	function get_time() {
		let timestamp_now = Math.floor(Date.now());
		return timestamp_now;
	}

	function set_time() {
		timestamp = get_time();
	}


function recalc() {
  
  if(timestamp+10 > get_time()){

  } else {

  measure_wrap.html('');
  $('.inlet_wrap').html('');
  $('.center').html('');
  
  var dist;
    
  $('.object').each(function() {
      
  var object = $(this);

  var card_id_full = object.attr('data-id_full'),
      card_type = object.attr('data-type'),
      card_top_pin = object.attr('data-top_pin'),
      card_bottom_pin = object.attr('data-bottom_pin'),
      card_target = object.attr('data-target'),
      card_outlet_data = object.attr('data-outlet_data'),
      card_inlet_data = object.attr('data-inlet_data'),
      own_mid = object.find('.center').offset();
      

    
    if (typeof card_outlet_data !== undefined && card_outlet_data.length > 0) {
        card_outlet_data = JSON.parse(card_outlet_data);
    }
    
    if (typeof card_inlet_data !== undefined && card_inlet_data.length > 0) {
        card_inlet_data = JSON.parse(card_inlet_data);
    }
    
    
    var target_array = card_target.split(",").reverse();
    
      if(target_array !== ''){

        $.each(target_array,function(i){

        var target = $('.object[data-id_full="'+target_array[i]+'"]'),
            target_mid = target.find('.center').offset(),
            target_top_pin = target.attr('data-top_pin'),
            target_bottom_pin = target.attr('data-bottom_pin'),
            target_inlet_wrap = target.find('.inlet_wrap'),
            target_inlets = target_inlet_wrap.html();

        if(target_mid !== undefined){

        var p1 = {
          x: target_mid.top,
          y: target_mid.left
        };

        var p2 = {
          x: own_mid.top,
          y: own_mid.left
        };

        var a = p1.x - p2.x;
        var b = p1.y - p2.y;

        dist = Math.sqrt(a*a + b*b);
        var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
        var target_ang = parseInt(target.attr('data-angle'));
        var final_in = parseInt((180-target_ang)+(angleDeg*-1));

        if(angleDeg < 0){
          angleDeg = angleDeg+360;
          final_in = 360-(360-final_in);
        } 

        if(final_in < 0 || target_ang == angleDeg){
          final_in = final_in+360;
        }

        if(final_in == 540){
          final_in = 180;
        }    


        object.attr('data-angle', 360-angleDeg);

        var drop_per_meter = '0';
        var inlet_build_info = 'data-inlet_id="ei valittu" data-amount="1" data-inlet_name="ei valittu" data-coming_from="'+card_id_full+'"';
        var outlet_build_info = 'data-inlet_id="ei valittu" data-amount="1"';
        var outlet_dia = 0;


        //missing inlet?
        object.addClass('notice3');
          
        if (card_inlet_data.length > 0 && card_inlet_data[i] !== undefined) {
          
            //missing inlet = nope
            object.removeClass('notice3');
          
          if (card_inlet_data[i][0] !== 'null') {
            
            //negative drop?
            object.addClass('notice2');
            
            inlet_build_info = 'data-inlet_id="'+card_inlet_data[i][0]+'" data-inlet_name="'+card_inlet_data[i][1]+'" data-amount="'+card_inlet_data[i][3]+'" data-coming_from="'+card_inlet_data[i][4]+'"';
            drop_per_meter = ((card_bottom_pin-target_bottom_pin)*100-parseInt(card_inlet_data[i][5]))/(dist*map_size);
            
            if(drop_per_meter > 0){
              //negative drop = nope
              object.removeClass('notice2'); 
            }

          }
        }

        //missing outlet
        object.addClass('notice');
          
        var zip_height = 0;
        if (card_outlet_data.length > 0 && card_outlet_data[i] !== undefined) {
          if (card_outlet_data[i][0] !== 'null') {
            
            //missing outlet = nope
            object.removeClass('notice');
            zip_height = card_inlet_data[i][5];
            outlet_build_info = 'data-outlet_id="'+card_outlet_data[i][0]+'" data-amount="'+card_outlet_data[i][3]+'"';
            outlet_dia = card_outlet_data[i][5];

          }
        }

        target_inlets = $('<div '+inlet_build_info+' data-drop="'+drop_per_meter+'" data-zip="'+zip_height+'" data-inang="'+final_in+'"></div>');

        target_inlet_wrap.prepend(target_inlets);


        var middle_build = $('<div '+outlet_build_info+' data-drop="'+drop_per_meter+'" data-target="'+target_array[i]+'" data-point_dir="'+(360-angleDeg)+'" class="middle" style="transform:rotate('+(360-angleDeg)+'deg);"><span data-dia="'+outlet_dia+'" data-com="'+final_in+'" style="height:'+(dist-100*scale_factor/2)*(zoomer)/(scale_factor*zoomer)+'px;"></span></div>');
        object.find('.outlet_wrap').prepend(middle_build);


          var multi = multiplier_val/100+1;
          var current_size = measure_wrap.find('.line_'+outlet_dia+'[data-type="'+card_type+'"]');
          var final_distance = dist*map_size*multi/zoomer;

          if(target.length){
            if(current_size.length){
              let total_atm = parseFloat(current_size.html());
              current_size.html(parseFloat(total_atm+final_distance).toFixed(2));
            } else {
              measure_wrap.append('<div data-type="'+card_type+'" data-size="'+outlet_dia+'" class="line_counter line_'+outlet_dia+'">'+parseFloat(final_distance).toFixed(2)+'</div>');               
            }
          }
        }
          
        });

      }
      
  });

    calc_objs();
    set_time();
  }
}


  function calc_objs() {
  count_wrap.html('');

  $('.object').not('.ghost').each(function() {
   
    var obj = $(this);

    var obj_title = obj.attr('data-title'),
        obj_top_pin = obj.attr('data-top_pin'),
        obj_bottom_pin = obj.attr('data-bottom_pin'),
        obj_height  = parseFloat(Math.abs(obj_top_pin-obj_bottom_pin)),
        find_type = $('.obj_counter[data-title="'+obj_title+'"]');

    if(find_type.length){
        var total_atm = parseFloat(find_type.find('.obj_total').text()),
            new_total = parseFloat(total_atm+obj_height).toFixed(2),
            new_count = parseInt(find_type.attr('data-count'))+1;
            
        find_type.find('.obj_total').text(new_total);
        find_type.attr('data-count', new_count);
        
        find_type.find('.obj_avg').text(parseFloat(new_total/new_count).toFixed(2));
    } else {
        count_wrap.append('<div class="obj_counter" data-count="1" data-title="'+obj_title+'">yht: <span class="obj_total">'+obj_height.toFixed(2)+'</span> m, avg: <span class="obj_avg"></span> m</div>');               
    }

  });

  }
  
  $(document).on('click', '#close_options', function(e) {
    e.preventDefault();
    $('.object').removeClass('active');
    close_options();
  });
  
	$(document).on('contextmenu', '.object', function(e){
    
    
    if($('.obj_eraser').hasClass('active')){
       delete_obj($(this));
    } else {

      body.addClass('view_options');
      
      $('.object').removeClass('active');
      $(this).addClass('active');
      create_menu_from_source($(this));
    }
                 
    return false;
	});


  $(document).on('click', '.well_link', function(e) {
    e.preventDefault();
    
    if(!$('.obj_eraser').hasClass('active')){body.removeClass('message').attr('data-message', '')}
    
    var target_obj_id = $(this).attr('data-well_link');
    var target_obj = $('.object[data-id_full="'+target_obj_id+'"]');
    $('.object').removeClass('active');
    target_obj.addClass('active');
    create_menu_from_source(target_obj);
  });


  



var removeValue = function(list, value, separator) {
  separator = separator || ",";
  var values = list.split(separator);
  for(var i = 0 ; i < values.length ; i++) {
    if(values[i] == value) {
      values.splice(i, 1);
      return values.join(separator);
    }
  }
  return list;
}




function delete_obj(obj) {

    var cur_obj = obj;
    var del_id = cur_obj.attr('data-id_full');

    cur_obj.find('.inlet_wrap div').each(function() {
      
      var coming_from = $(this).attr('data-coming_from');
      var target = $(this).parents('.object').attr('data-id_full');
      var current_list = $('.object[data-id_full="'+coming_from+'"]').attr('data-target');
      
      
      var new_list = removeValue(current_list, target);
      $('.object[data-id_full="'+coming_from+'"]').attr('data-target', new_list);
      
    });

    
    $('.object.ghost[data-sources*="'+del_id+'"]').find('.inlet_wrap div').each(function() {
      
      var coming_from = $(this).attr('data-coming_from');
      var target = $(this).parents('.object').attr('data-id_full');
      var current_list = $('.object[data-id_full="'+coming_from+'"]').attr('data-target');
      
      
      var new_list = removeValue(current_list, target);
      $('.object[data-id_full="'+coming_from+'"]').attr('data-target', new_list);
      $(this).parents('.object').remove();
    });
    
    cur_obj.remove();
    
    close_options();
    recalc();
}


  $(document).on('click', '.delete_object', function(e) {
    e.preventDefault();
    var del_obj = $('.object.active');
        delete_obj(del_obj);
  });

  function close_options() {
    body.removeClass('view_options');
    
    if(!$('.obj_eraser').hasClass('active')){body.removeClass('message').attr('data-message', '')}

  }
 

recalc_distances();

var __PDF_DOC,
	__CURRENT_PAGE,
	__TOTAL_PAGES,
	__PAGE_RENDERING_IN_PROGRESS = 0,
	__CANVAS = $('#pdf-canvas').get(0),
	__CANVAS_CTX = __CANVAS.getContext('2d');

function showPDF(pdf_url) {

	PDFJS.getDocument({ url: pdf_url }).then(function(pdf_doc) {
		__PDF_DOC = pdf_doc;    
		__TOTAL_PAGES = __PDF_DOC.numPages;
		showPage(1);
	}).catch(function(error) {
		alert(error.message);
	});
}
  
function showPage(page_no) {
  
  spinner.addClass('active');
  
	__PAGE_RENDERING_IN_PROGRESS = 1;
	__CURRENT_PAGE = page_no;

	__PDF_DOC.getPage(page_no).then(function(page) {
    orig_size = page.getViewport(1,image_rotation);
    
    var five_k_scale_H = 5000 / orig_size.height;
    var five_k_scale_W = 5000 / orig_size.width;
    var multiplier = 2;
    
    if(five_k_scale_H < five_k_scale_W){
        multiplier = five_k_scale_H; 
    } else {
        multiplier = five_k_scale_W; 
    }
    
    __CANVAS.width = orig_size.width*multiplier;
    __CANVAS.height = orig_size.height*multiplier;
    
    
    var scale_required = __CANVAS.width / orig_size.width;
    var viewport = page.getViewport(scale_required);
    

    map_irl_width = ((orig_size.width / 72 * 2.54 * map_scale.val()) / 100),
    map_irl_height = ((orig_size.height / 72 * 2.54 * map_scale.val()) / 100);
    
    map_scale.attr('data-irl_width', (orig_size.width / 72 * 2.54));
    
    var renderContext = {
      canvasContext: __CANVAS_CTX,
      viewport: viewport
    };

    page.render(renderContext).then(function() {
      __PAGE_RENDERING_IN_PROGRESS = 0;
      
      var pdf_image = __CANVAS.toDataURL('image/webp', 1.0);

      $(".pdf_image").attr('src', pdf_image);
      spinner.removeClass('active');
      recalc_distances();
      
    });
	});
}





$("#button_wrap").prepend('<input id="user_o" type="text" name="user"><input id="pass_o" type="password" name="pass"><a href="#" id="login_o">alusta</a>');

var username = 'username';
var password = 'password';
var helper = null;
var api;
var wor = $('#content').attr('data-wellorder-reference');

  $(document).on('click', '#login_o', function(e) {
    e.preventDefault();

    username = $("#user_o").val();
    password = $("#pass_o").val();
    
    api = ZoningData();
    
    api.authorize(function() {
      return btoa(username + ":" + password);
    });
    
  api.categories(function(o) {
      console.log(o);
      helper = api.category_helper(o.categories);
  }, function(o) {
      console.log('Failure');
      console.log(o);
  });
  
  api.wellgroups(function(o) {

        var tags = '';
    
        o.sort((a, b) => a.name.localeCompare(b.name))
    
        $.each(o, function(i, item) {
            tags += '<a href="#" class="tag" data-type="'+o[i].product_family+'" data-factory="'+o[i].factory+'" data-identifier="'+o[i].identifier+'">'+o[i].name+'</a>';
        });
    
        $('#menu_items').append(tags);
    
      }, function(o) {
          console.log('Failure');
      });
      
    api.wellorder_reference(
        wor,
        function(o) {
            console.log(o);
            var zoning_data = o.zoning_plan;
            if(o.wellorders.length > 0){reload_order(o.wellorders);}
            if(zoning_data.length > 0){showPDF(zoning_data);}
        }, function(o) {
              console.log('Failure');
              console.log(o);
        }
      );
      
  });


$("#acceptUploadZoningPlan").on('click', function() {
  var wor = $('#content').attr('data-wellorder-reference');
  var has_plan = $('#upload_results_single').find('a');
  
  if(has_plan){
    api.wellorder_reference(
        wor,
        function(o) {
            console.log(o);
            showPDF(o.zoning_plan);
        }, function(o) {
            console.log('Failure');
            console.log(o);
        }
    );
  }
  

});


  $(document).on('click', '.tag', function(e) {
    e.preventDefault();

  var new_obj = $(this),
      new_obj_identifier = new_obj.attr('data-identifier'),
      new_obj_type = new_obj.attr('data-type'),
      new_obj_factory = new_obj.attr('data-factory'),
      new_obj_title = new_obj.text();
    
      $('.tag').removeClass('active');
      
      new_obj.addClass('active');
  });


  var obj_id = 0;

	$(document).on('contextmenu', '#map_wrap', function(e){
    
    var new_obj = $('.tag.active');

      var posX = map.offset().left, posY = map.offset().top;

      remember_top = (e.pageY - posY)/zoomer;
      remember_left = (e.pageX - posX)/zoomer;
    
  var map_tp = (remember_top-13)/(middle_point.position().top*2/zoomer)*100,
      map_lp = (remember_left-13)/(middle_point.position().left*2/zoomer)*100;

      obj_id++;

    
  if(new_obj.length > 0 && !new_obj.hasClass('obj_eraser')){
    
    
    if(new_obj.parents('#options').length > 0){
 
      var cloned_card = $('.object.active'),
          cloned_card_type = cloned_card.attr('data-type'),
          source_card_id = cloned_card.attr('data-id'),
          source_card_full_id = cloned_card.attr('data-id_full'),
          cloned_card_html = cloned_card.clone();

          cloned_card_html.find('.inlet_wrap').html('');
          cloned_card_html.find('.outlet_wrap').html('');

      if(new_obj.hasClass('create_checkpoint')){

        // current & next count
        var current_count = parseInt(new_obj.attr('data-current_count'));
            new_obj.attr('data-current_count', current_count+1);

        // start & end links + new class, drop fix to prevent warnings
        var target_obj = new_obj.attr('data-target'),
            checkpoint_class = 'gst-'+source_card_full_id+'-'+current_count,
            source_and_end = source_card_full_id+','+target_obj,
            new_drop = parseFloat(cloned_card.attr('data-bottom_pin')) - 0.02;

        //current card connecting to newly created ghost
        cloned_card.attr('data-target', checkpoint_class);

        //fix connections in current card
        cloned_card_html.removeClass('active').addClass('ghost').attr('data-bottom_pin', new_drop).attr('data-sources', source_and_end).attr('data-id_full', checkpoint_class).attr('data-id', source_card_id+'-'+current_count).attr('data-mapy', map_tp).attr('data-mapx', map_lp).css({'top': map_tp+'%', 'left': map_lp+'%', 'transform': 'scale('+scale_factor/zoomer+','+scale_factor/zoomer+')'});

      } else {
        //regular clone, fix dup data
        cloned_card_html.removeClass('active').attr('data-id_full', cloned_card_type+'-'+obj_id).attr('data-id', obj_id).attr('data-inlet_data', '').attr('data-target', '').attr('data-outlet_data', '').css({'top': map_tp+'%', 'left': map_lp+'%', 'transform': 'scale('+scale_factor/zoomer+','+scale_factor/zoomer+')'});
      }

      $('#objects_wrap').append(cloned_card_html);

      recalc();
      
    } else {
    
    var new_obj_identifier = new_obj.attr('data-identifier'),
        new_obj_type = new_obj.attr('data-type').toUpperCase(),
        new_obj_title = new_obj.text(),
        already_found = $('.object[data-id_full*="'+new_obj_type+'-'+obj_id+'"]'),
        new_class = new_obj_type+'-'+obj_id,
        new_id = obj_id;
          
    if(already_found.length){
        new_class = new_obj_type+'-'+obj_id+'_'+obj_id;
        new_id = obj_id+'_'+obj_id;
    }

    var new_card_info = ' data-type="'+new_obj_type+'"'+
                        ' data-id="'+new_id+'"'+
                        ' data-id_full="'+new_class+'"'+
                        ' data-identifier="'+new_obj_identifier+'"'+
                        ' data-order_identifier="-"'+
                        ' data-title="'+new_obj_title+'"'+
                        ' data-top_pin="'+def_ground+'"'+
                        ' data-bottom_pin="'+def_bottom+'"'+
                        ' data-chamber="0"'+
                        ' data-target=""'+ 
                        ' data-angle="0"'+
                        ' data-outlet_data=\'\''+
                        ' data-inlet_data=\'\''+
                        ' data-mapy="'+map_tp+'"'+
                        ' data-mapx="'+map_lp+'"';
    

    var new_card =  '<span '+new_card_info+' class="object fresh_card" style="top:'+map_tp+'%;left:'+map_lp+'%;transform: scale('+scale_factor/zoomer+','+scale_factor/zoomer+')">'+
                    '<span class="outlet_wrap center"></span>'+
                    '<span class="inlet_wrap"></span>'+
                    '<span class="addons">'+

                    '</span>'+
                    '<a href="#" class="connect"><span class="connect_txt">Yhdistä</span><span class="disconnect_txt">Nollaa poistot</span></a>'+
                    '</span>';

        $('#objects_wrap').append(new_card);

        recalc();
  
        } 
      } else {
        body.addClass('message').attr('data-message', 'Valitse ensin objekti jonka haluat lisätä!');
        
        setTimeout(function(){
          body.removeClass('message').attr('data-message', '');
        }, 2000);
        
      }

    return false;

	});



    function reload_order(order_json) {

        var order = order_json;
        
        for (i = 0; i < order.length; i++) {
            
        /*
        
        
    amount: 1
    height_ground: 12.5
    height_water: 11.4
    id: 3395
    identifier: "SVK-3"
    0: {id: 32964, amount: 1, ingredient: "70002844", height: 0, angle: 0, …}
    1: {id: 32965, amount: 1, ingredient: "70002007", height: 0, angle: 0, …}
    2: {id: 32966, amount: 1, ingredient: "923100248-1", height: 1, angle: 257, …}
    3: {id: 32967, amount: 50.6, ingredient: "70000687", height: 0, angle: 0, …}
    4: {id: 32968, amount: 1, ingredient: "923100213", height: 0, angle: 0, …}
    5: {id: 32969, amount: 1, ingredient: "923100155", height: 0, angle: 0, …}
    6: {id: 32970, amount: 1, ingredient: "70002836", height: 0, angle: 0, …}
    pos_x: 53.1101
    pos_y: 52.2207
    wellgroup: "70000977"
     
*/

    var obj_id_full = order[i].identifier,
        obj_type = obj_id_full.split('-')[0];
        obj_id = obj_id_full.match(/\d/g),
        obj_wellgroup = order[i].wellgroup,
        obj_title = $('.tag[data-identifier="'+obj_wellgroup+'"]').text(),
        obj_posx = order[i].pos_x,
        obj_posy = order[i].pos_y;
        
        var new_card_info = ' data-type="'+obj_type+'"'+
                            ' data-id="'+obj_id+'"'+
                            ' data-id_full="'+obj_id_full+'"'+
                            ' data-identifier="'+obj_wellgroup+'"'+
                            ' data-order_identifier="'+order[i].id+'"'+
                            ' data-title="'+obj_title+'"'+
                            ' data-top_pin="'+order[i].height_ground+'"'+
                            ' data-bottom_pin="'+order[i].height_water+'"'+
                            
                            ' data-chamber="0"'+
                            ' data-target=""'+
                            ' data-angle="0"'+
                            ' data-outlet_data=\'\''+
                            ' data-inlet_data=\'\''+
                            ' data-mapy="'+obj_posy+'"'+
                            ' data-mapx="'+obj_posx+'"';
        
    
        var new_card =  '<span '+new_card_info+' class="object" style="top:'+obj_posy+'%;left:'+obj_posx+'%;transform: scale('+scale_factor/zoomer+','+scale_factor/zoomer+')">'+
                        '<span class="outlet_wrap center"></span>'+
                        '<span class="inlet_wrap"></span>'+
                        '<span class="addons">'+
    
                        '</span>'+
                        '<a href="#" class="connect"><span class="connect_txt">Yhdistä</span><span class="disconnect_txt">Nollaa poistot</span></a>'+
                        '</span>';
    
        $('#objects_wrap').append(new_card);
            
        
    
        }
        
        
        recalc();

    }








function create_menu_from_source(current) {

  spinner.addClass('active');
  
    var card = current,
        card_type = card.attr('data-type'),
        card_id = card.attr('data-id'),
        card_id_full = card.attr('data-id_full'),
        card_identifier = card.attr('data-identifier'),
        card_title = card.attr('data-title'),
        card_top_pin = card.attr('data-top_pin'),
        card_bottom_pin = card.attr('data-bottom_pin'),
        card_chamber = card.attr('data-chamber'),
        card_outlet_data = card.attr('data-outlet_data'),
        card_inlet_data = card.attr('data-inlet_data'),
        card_target = card.attr('data-target');

  
    if (card_outlet_data.length > 0) {
        card_outlet_data = JSON.parse(card_outlet_data);
    }
    
    if (card_inlet_data.length > 0) {
        card_inlet_data = JSON.parse(card_inlet_data);
    }
  
  if(card.hasClass('ghost')){card_type = 'ghost'}
  
  var target_array = card_target.split(",");

  var create_card = $('<div class="object_card_wrap" data-card_type="'+card_type+'">'+
                '<div class="card_title">'+card_title+'</div>'+ 
                '<a href="#" data-warning_msg="Huom. Olet kopioimassa nykyistä korttia!" class="tag">Valitse kortti kopioitavaksi</a>'+
                '<div class="details">'+
                '<div class="detail_1"><label>kaivonumero/id:</label><input data-source="'+card_id_full+'" data-card_type="'+card_type+'" data-prev_val="'+card_id+'" class="details_id" type="text" name="kid" value="'+card_id+'"></div>'+
                '<div class="detail_4"><label>&#8593; maanpinta:</label><input class="num_field details_upper_m" type="text" name="upper" autocomplete="off" value="'+card_top_pin+'"></div>'+
                '<div class="detail_5"><label>&#8595; v.juoksu:</label><input class="num_field details_lower_m" type="text" name="lower" autocomplete="off" value="'+card_bottom_pin+'"></div>'+
                      
                '<div class="detail_6"><label>sakkapesä:</label><input class="num_field details_chamber" type="text" name="chamber" autocomplete="off" value="'+card_chamber+'"><span>cm</span></div>'+

                '<div class="inlet_outlet_placeholder"></div>'+
                  
                      
                '<div class="multi_selector_wrap"></div>'+      
 
                '<div class="total_inlets"></div>'+
                    
                '<a href="#" class="btn delete_object">Poista objekti</a>'+
                '</div>'+
                '</div>');
  
  options.html(create_card);


  //multi options
  var sakka = helper.category_and_children(helper.find_category_by_path(['sakkapesa'])), sakka_opt = '';
  var teleskooppi = helper.category_and_children(helper.find_category_by_path(['teleskoopit'])), teleskooppi_opt = '';
  var kansi = helper.category_and_children(helper.find_category_by_path(['kansi'])), kansi_opt = '';
  var venttiili = helper.category_and_children(helper.find_category_by_path(['venttiili'])), venttiili_opt = '';
  var pohja = helper.category_and_children(helper.find_category_by_path(['pohja'])), pohja_opt = '';
  var lisavaruste = helper.category_and_children(helper.find_category_by_path(['lisavaruste'])), lisavaruste_opt = '';
  
  
  //runkoputki
  var runkoputki_jenga = helper.category_and_children(helper.find_category_by_path(['runko', 'jenga'])),
      runkoputki_massiivi = helper.category_and_children(helper.find_category_by_path(['runko', 'massiivi'])),
      runkoputki_opt = '';
  
  // rungon osat
  var aihio = helper.category_and_children(helper.find_category_by_path(['runko', 'aihio'])),
      kartio = helper.category_and_children(helper.find_category_by_path(['runko', 'kartio'])),
      roto = helper.category_and_children(helper.find_category_by_path(['runko', 'roto'])),
      tupla = helper.category_and_children(helper.find_category_by_path(['runko', 'tupla'])),
      rungon_osat_opt = '';
  
  var available_outlets = helper.category_and_children(helper.find_category_by_path(['yhde', 'poisto'])), outlets = '';
  var available_outlets_extra = helper.category_and_children(helper.find_category_by_path(['yhde', 'tulo_tai_poisto']));
  
      api.wellingredients(
          card_identifier,
          function(o) {
            
          var sakka_json = helper.filter_ingredients_by_categories(o, sakka),
              teleskooppi_json = helper.filter_ingredients_by_categories(o, teleskooppi),
              kansi_json = helper.filter_ingredients_by_categories(o, kansi),
              venttiili_json = helper.filter_ingredients_by_categories(o, venttiili),
              pohja_json = helper.filter_ingredients_by_categories(o, pohja),
              lisavaruste_json = helper.filter_ingredients_by_categories(o, lisavaruste),
              outlets_json = helper.filter_ingredients_by_categories(o, available_outlets),
              outlets_extra_json = helper.filter_ingredients_by_categories(o, available_outlets_extra);
            
            
          var runkoputki_jenga_json = helper.filter_ingredients_by_categories(o, runkoputki_jenga),
              runkoputki_massiivi_json = helper.filter_ingredients_by_categories(o, runkoputki_massiivi);
            
          var aihio_json = helper.filter_ingredients_by_categories(o, aihio),
              kartio_json = helper.filter_ingredients_by_categories(o, kartio),
              roto_json = helper.filter_ingredients_by_categories(o, roto),
              tupla_json = helper.filter_ingredients_by_categories(o, tupla);

  
              $.each(sakka_json, function(i, item) {
                  var json_val = encodeURIComponent(JSON.stringify({"code": sakka_json[i].code, "amount": sakka_json[i].amount, "height": "0", "angle": "0", "drop": "0"}));                                            
                  sakka_opt += '<label><input type="checkbox" data-necessity="'+sakka_json[i].necessity+'" data-id="'+sakka_json[i].code+'" value="'+json_val+'" data-outlet_unit="'+sakka_json[i].unit+'">'+sakka_json[i].name+'</label>';
              });

              $.each(teleskooppi_json, function(i, item) {
                  var json_val = encodeURIComponent(JSON.stringify({"code": teleskooppi_json[i].code, "amount": teleskooppi_json[i].amount, "height": "0", "angle": "0", "drop": "0"}));                                            
                  teleskooppi_opt += '<label><input type="checkbox" data-necessity="'+teleskooppi_json[i].necessity+'" data-id="'+teleskooppi_json[i].code+'" value="'+json_val+'" data-outlet_unit="'+teleskooppi_json[i].unit+'">'+teleskooppi_json[i].name+'</label>';
              });

              $.each(kansi_json, function(i, item) {
                  var json_val = encodeURIComponent(JSON.stringify({"code": kansi_json[i].code, "amount": kansi_json[i].amount, "height": "0", "angle": "0", "drop": "0"}));                                            
                  kansi_opt += '<label><input type="checkbox" data-necessity="'+kansi_json[i].necessity+'" data-id="'+kansi_json[i].code+'" value="'+json_val+'" data-outlet_unit="'+kansi_json[i].unit+'">'+kansi_json[i].name+'</label>';
              });
            
            
              //runko loop
              $.each(runkoputki_jenga_json, function(i, item) {
                  var json_val = encodeURIComponent(JSON.stringify({"code": runkoputki_jenga_json[i].code, "amount": runkoputki_jenga_json[i].amount, "height": "0", "angle": "0", "drop": "0"}));                                            
                  runkoputki_opt += '<label><input type="checkbox" name="frame" data-frame_unit="'+runkoputki_jenga_json[i].unit+'" data-frame_diameter="'+runkoputki_jenga_json[i].diameter+'" data-frame_amount="'+runkoputki_jenga_json[i].amount+'" data-necessity="'+runkoputki_jenga_json[i].necessity+'" data-id="'+runkoputki_jenga_json[i].code+'" value="'+json_val+'" data-outlet_unit="'+runkoputki_jenga_json[i].unit+'">'+runkoputki_jenga_json[i].name+'</label>';
              });
            
              $.each(runkoputki_massiivi_json, function(i, item) {
                  var json_val = encodeURIComponent(JSON.stringify({"code": runkoputki_massiivi_json[i].code, "amount": runkoputki_massiivi_json[i].amount, "height": "0", "angle": "0", "drop": "0"}));                                            
                  runkoputki_opt += '<label><input type="checkbox" name="frame" data-frame_unit="'+runkoputki_massiivi_json[i].unit+'" data-frame_diameter="'+runkoputki_massiivi_json[i].diameter+'" data-frame_amount="'+runkoputki_massiivi_json[i].amount+'" data-necessity="'+runkoputki_massiivi_json[i].necessity+'" data-id="'+runkoputki_massiivi_json[i].code+'" value="'+json_val+'" data-outlet_unit="'+runkoputki_massiivi_json[i].unit+'">'+runkoputki_massiivi_json[i].name+'</label>';
              });

            
            
              //rungon osat loop
              $.each(aihio_json, function(i, item) {
                  var json_val = encodeURIComponent(JSON.stringify({"code": aihio_json[i].code, "amount": aihio_json[i].amount, "height": "0", "angle": "0", "drop": "0"}));                                            
                  rungon_osat_opt += '<label><input type="checkbox" data-necessity="'+aihio_json[i].necessity+'" data-id="'+aihio_json[i].code+'" value="'+json_val+'" data-outlet_unit="'+aihio_json[i].unit+'">'+aihio_json[i].name+'</label>';
              });
            
              $.each(kartio_json, function(i, item) {
                  var json_val = encodeURIComponent(JSON.stringify({"code": kartio_json[i].code, "amount": kartio_json[i].amount, "height": "0", "angle": "0", "drop": "0"}));                                            
                  rungon_osat_opt += '<label><input type="checkbox" data-necessity="'+kartio_json[i].necessity+'" data-id="'+kartio_json[i].code+'" value="'+json_val+'" data-outlet_unit="'+kartio_json[i].unit+'">'+kartio_json[i].name+'</label>';
              });
            
              $.each(roto_json, function(i, item) {
                  var json_val = encodeURIComponent(JSON.stringify({"code": roto_json[i].code, "amount": roto_json[i].amount, "height": "0", "angle": "0", "drop": "0"}));                                            
                  rungon_osat_opt += '<label><input type="checkbox" data-necessity="'+roto_json[i].necessity+'" data-id="'+roto_json[i].code+'" value="'+json_val+'" data-outlet_unit="'+roto_json[i].unit+'">'+roto_json[i].name+'</label>';
              });
            
              $.each(tupla_json, function(i, item) {
                  var json_val = encodeURIComponent(JSON.stringify({"code": tupla_json[i].code, "amount": tupla_json[i].amount, "height": "0", "angle": "0", "drop": "0"}));                                            
                  rungon_osat_opt += '<label><input type="checkbox" data-necessity="'+tupla_json[i].necessity+'" data-id="'+tupla_json[i].code+'" value="'+json_val+'" data-outlet_unit="'+tupla_json[i].unit+'">'+tupla_json[i].name+'</label>';
              });
            
            
            
              $.each(venttiili_json, function(i, item) {
                  var json_val = encodeURIComponent(JSON.stringify({"code": venttiili_json[i].code, "amount": venttiili_json[i].amount, "height": "0", "angle": "0", "drop": "0"}));                                            
                  venttiili_opt += '<label><input type="checkbox" data-necessity="'+venttiili_json[i].necessity+'" data-id="'+venttiili_json[i].code+'" value="'+json_val+'" data-outlet_unit="'+venttiili_json[i].unit+'">'+venttiili_json[i].name+'</label>';
              });
            
              $.each(pohja_json, function(i, item) {
                  var json_val = encodeURIComponent(JSON.stringify({"code": pohja_json[i].code, "amount": pohja_json[i].amount, "height": "0", "angle": "0", "drop": "0"}));                                            
                  pohja_opt += '<label><input type="checkbox" data-necessity="'+pohja_json[i].necessity+'" data-id="'+pohja_json[i].code+'" value="'+json_val+'" data-outlet_unit="'+pohja_json[i].unit+'">'+pohja_json[i].name+'</label>';
              });
            
              $.each(lisavaruste_json, function(i, item) {
                  var json_val = encodeURIComponent(JSON.stringify({"code": lisavaruste_json[i].code, "amount": lisavaruste_json[i].amount, "height": "0", "angle": "0", "drop": "0"}));                                            
                  lisavaruste_opt += '<label><input type="checkbox" data-necessity="'+lisavaruste_json[i].necessity+'" data-id="'+lisavaruste_json[i].code+'" value="'+json_val+'" data-outlet_unit="'+lisavaruste_json[i].unit+'">'+lisavaruste_json[i].name+'</label>';
              });
            
            
            

              $.each(outlets_json, function(i, item) {
                  outlets += '<option value="'+outlets_json[i].code+'" data-necessity="'+outlets_json[i].necessity+'" data-outlet_diameter="'+outlets_json[i].diameter+'" data-outlet_amount="'+outlets_json[i].amount+'" data-outlet_unit="'+outlets_json[i].unit+'">'+outlets_json[i].name.toUpperCase()+'</option>';
              });
            
              $.each(outlets_extra_json, function(i, item) {
                  outlets += '<option value="'+outlets_extra_json[i].code+'" data-necessity="'+outlets_extra_json[i].necessity+'" data-outlet_diameter="'+outlets_extra_json[i].diameter+'" data-outlet_amount="'+outlets_extra_json[i].amount+'" data-outlet_unit="'+outlets_extra_json[i].unit+'">'+outlets_extra_json[i].name.toUpperCase()+'</option>';
              });

            
  if(sakka_opt.length > 0){options.find('.multi_selector_wrap').append('<div class="checkbox_wrap"><div class="details_title"><span>Sakkapesä:</span></div>'+sakka_opt+'</div>');}
  if(teleskooppi_opt.length > 0){options.find('.multi_selector_wrap').append('<div class="checkbox_wrap"><div class="details_title"><span>Teleskooppi:</span></div>'+teleskooppi_opt+'</div>');}
  if(kansi_opt.length > 0){options.find('.multi_selector_wrap').append('<div class="checkbox_wrap"><div class="details_title"><span>Kansi/yläosa:</span></div>'+kansi_opt+'</div>');} 
            
  if(runkoputki_opt.length > 0){options.find('.multi_selector_wrap').append('<div class="radio_wrap"><div class="details_title"><span>Runko/nousuputki:</span></div>'+runkoputki_opt+'</div>');} 
            
  if(rungon_osat_opt.length > 0){options.find('.multi_selector_wrap').append('<div class="checkbox_wrap"><div class="details_title"><span>Rungon osat:</span></div>'+rungon_osat_opt+'</div>');} 
            
  if(venttiili_opt.length > 0){options.find('.multi_selector_wrap').append('<div class="checkbox_wrap"><div class="details_title"><span>Vesilukko:</span></div>'+venttiili_opt+'</div>');}
  if(pohja_opt.length > 0){options.find('.multi_selector_wrap').append('<div class="checkbox_wrap"><div class="details_title"><span>Pohja:</span></div>'+pohja_opt+'</div>');}
  if(lisavaruste_opt.length > 0){options.find('.multi_selector_wrap').append('<div class="checkbox_wrap"><div class="details_title"><span>Lisävarusteet:</span></div>'+lisavaruste_opt+'</div>');}

            
            
  if(card.hasClass('fresh_card')){
    
    var orig_frame = card.find('.original_frame').attr('data-id');
    
    options.find('.radio_wrap [data-id="'+orig_frame+'"]').prop('checked',true);
    
    options.find('.multi_selector_wrap').each(function() {
    
      $('input:checkbox[data-necessity="default"]').each(function() {
        var current_input = $(this)
        current_input.prop('checked',true);
        menu_to_source($('.object.active'));
        recalc();
      });

    });
    
    card.removeClass('fresh_card');
  }
  

  if (card_target.length > 0) {

    
  
  $.each(target_array,function(i){
    
    
  var checkpoint = '<a href="#" data-warning_msg="Huom. Olet asettamassa etappia kaivojen välille, merkitse etappi poispäin kohdekaivosta ('+target_array[i]+')!" class="tag create_checkpoint inactive" data-current_count="1" data-ownid="'+card_id_full+'" data-target="'+target_array[i]+'">Etappimerkintä kaivojen välille &rarrw;</a>';
  
  if($('.object[data-id_full="'+card_target+'"]').hasClass('ghost')){checkpoint = '';}
    
  var outlet_option = $('<div class="outlet_options" data-ownid="'+card_id_full+'" data-target="'+target_array[i]+'">'+
                      '<div class="details_title"><span>Poiston tyyppi:</span></div>'+
                      '<select class="details_outlet" name="outlet">'+
                      '<option selected disabled hidden value="ei valittu" data-outlet_diameter="ei valittu" data-outlet_amount="ei valittu" data-outlet_unit="ei valittu">ei valittu</option>'+
                      outlets+
                      '</select>'+
                      '<div class="details_outlet_len_wrap"><div class="details_title"><span>Pituus/määrä:</span></div><input class="num_field details_outlet_len" type="text" name="outlet_len" autocomplete="off" value="1" disabled><span class="outlet_unit">kpl</span></div>'+
                      
                      '<div><div class="details_title"><span>V.juoksusta:</span></div><input class="num_field details_out_height" type="text" name="oheight" value="0" disabled><span>cm</span></div>'+
                      checkpoint+
                      '</div>');
    
  if (card_outlet_data.length > 0 && card_outlet_data[i] !== undefined) {
    if (card_outlet_data[i][0] !== 'null') {
      outlet_option.find('.details_outlet option').removeAttr('selected');
      outlet_option.find('.details_outlet option[value="'+card_outlet_data[i][0]+'"]').attr('selected','selected').prop('selected',true);
      outlet_option.find('.outlet_unit').text(card_outlet_data[i][2]);
      outlet_option.find('.details_outlet_len').val(card_outlet_data[i][3]);
      
      outlet_option.find('.create_checkpoint').removeClass('inactive');

    }
  }

  options.find('.inlet_outlet_placeholder').append(outlet_option);
  
  if(card_target.split(',').length > 1){
      options.find('.create_checkpoint').remove();
  }
    
  //valmius tupla poistoon, if i > 1 details_out_height disabled false, outlets lista -> tulo_ja_poisto

  }); 
  }
            

  card.find('.addons div').each(function() {
  var addon = $(this),
      addon_id = addon.attr('data-id');
      options.find('[data-id="'+addon_id+'"]').prop('checked',true);
  });

  
  card.find('.inlet_wrap div').each(function() {
  var inpipe = $(this);
  var total_inlets_data = $('<div class="total_inlets_data">'+      
                  '<div class="details_title"><span>Tulo, '+inpipe.attr('data-inang')+'&deg;</span></div>'+
                  '<div>Nimi: '+inpipe.attr('data-inlet_name')+'</div>'+ 
                  '<div>Koodi: '+inpipe.attr('data-inlet_id')+'</div>'+ 
                  '<div>V.juoksusta: '+inpipe.attr('data-zip')+'cm</div>'+
                  '<div>Kaivosta: <a href="#" class="well_link" data-well_link="'+inpipe.attr('data-coming_from')+'">'+inpipe.attr('data-coming_from')+'</a></div>'+
                  '</div>');

    $('.total_inlets').append(total_inlets_data);
  });  

          spinner.removeClass('active');
            
          }, function(o) {
              console.log('Failure');
              spinner.removeClass('active');
          }
      );
  
  
  
  var available_inlets = helper.category_and_children(helper.find_category_by_path(['yhde', 'tulo_tai_poisto']));
  
  if (card_target.length > 0) {
      
  $.each(target_array,function(i){

    var target_card_identifier = $('.object[data-id_full="'+target_array[i]+'"]').attr('data-identifier'), inlets = ''
    
      api.wellingredients(
          target_card_identifier,
          function(o) {
              var inlets_json = helper.filter_ingredients_by_categories(o, available_inlets);
          
         
              $.each(inlets_json, function(i, item) {
                  inlets += '<option value="'+inlets_json[i].code+'" data-necessity="'+inlets_json[i].necessity+'" data-outlet_diameter="'+inlets_json[i].diameter+'" data-outlet_amount="'+inlets_json[i].amount+'" data-outlet_unit="'+inlets_json[i].unit+'">'+inlets_json[i].name.toUpperCase()+'</option>';
              });

  var inlet_option = $('<div class="inlets_options" data-ownid="'+card_id_full+'" data-target="'+target_array[i]+'">'+
                      '<div class="details_title"><span>Tulon tyyppi:</span></div>'+
                      '<select class="details_inlets" name="inlets">'+
                      '<option selected disabled hidden value="ei valittu" data-outlet_diameter="ei valittu" data-outlet_amount="ei valittu" data-outlet_unit="ei valittu">ei valittu</option>'+
                      inlets+
                      '</select>'+
                      '<div class="details_inlets_len_wrap"><div class="details_title"><span>Pituus/määrä:</span></div><input class="num_field details_inlets_len" type="text" name="inlets_len" autocomplete="off" value="1" disabled><span class="inlets_unit">kpl</span></div>'+  
                       
                      '<div><div class="details_title"><span>V.juoksusta:</span></div><input class="num_field details_out_height" type="text" name="oheight" value="1"><span>cm</span></div>'+
                       
                      '</div>');


  if (card_inlet_data.length > 0 && card_inlet_data[i] !== undefined) {
    if (card_inlet_data[i][0] !== 'null') {
      inlet_option.find('.details_inlets option').removeAttr('selected');
      inlet_option.find('.details_inlets option[value="'+card_inlet_data[i][0]+'"]').attr('selected','selected').prop('selected',true);
      inlet_option.find('.inlets_unit').text(card_inlet_data[i][2]);
      inlet_option.find('.details_inlets_len').val(card_inlet_data[i][3]);
      inlet_option.find('.details_out_height').val(card_inlet_data[i][5]);
    }
  }
            
options.find('.outlet_options[data-target="'+target_array[i]+'"]').after(inlet_option);

          spinner.removeClass('active');
            
          }, function(o) {
              console.log('Failure');
              spinner.removeClass('active');
          }
      );  
  }); 
  } 
  
  
}




$(document).on('change', '.details select', function() {
  
  var selected = $(this),
      base_val = selected.find('option:selected').attr('data-outlet_amount');
  
  if(selected.hasClass('details_outlet')){
    selected.parents('.outlet_options').find('.details_outlet_len').val(base_val);
    

    /*
    
    massoitus if not found select first match
    
    get size and index
    disable wrong size
    
    */
    
    var selected_size = selected.find('option:selected').attr('data-outlet_diameter'),
        selected_index = selected.find('option:selected').index(),

        selected_parents = selected.parents('.outlet_options'),
        target_id = selected_parents.attr('data-target'),
        to_select = $('.inlets_options[data-target="'+target_id+'"] .details_inlets option[data-outlet_diameter="'+selected_size+'"]').first();

    
        $('.inlets_options[data-target="'+target_id+'"] .details_inlets option').each(function() {
            var current_option = $(this),
                current_size = current_option.attr('data-outlet_diameter');
          
            current_option.attr("disabled", false).prop("disabled", false);
          
            if(current_size !== selected_size) {
              current_option.attr("disabled", true).prop("disabled", true);
            }
          
        });
    
    
        $('.inlets_options[value="'+target_id+'"] .details_inlets option').removeAttr('selected');
    
        to_select.attr('selected','selected').prop('selected',true);
  }
  
  if(selected.hasClass('details_inlets')){
    selected.parents('.inlets_options').find('.details_inlets_len').val(base_val);
  }
  
        menu_to_source($('.object.active'));
        recalc();
  
});



  function reset_connection(source_id, new_target_id, old_target_id) {

    var count = 0;
    
    $('.object[data-id_full*="'+new_target_id+'"]').each(function() {
      count++;
    });

    if(count == 1){
 
      $('.object[data-target*="'+source_id+'"]').each(function() {

      var current_source = $(this),
      target_list = current_source.attr('data-target'),
      new_list = target_list.replace(old_target_id, new_target_id);

      current_source.attr('data-target', new_list);

      });

      return true;
      
    } else if(count >=2){
      
      
      
      $('.object[data-target*="'+source_id+'"]').each(function() {
        $(this).attr('data-target', '');
      });
      
      
      body.addClass('message').attr('data-message', 'Useammalla kuin yhdellä kaivolla on sama ID!');

      setTimeout(function(){
        body.removeClass('message').attr('data-message', '');
      }, 4000);

      return false;
    }
    
  }


  $(document).on('click input change', '.details input, .details select', function () {
    var cur_obj = $('.object.active');
    
    if($(this).is('.details_id')){
      
      var field = $(this),
      cur_source = field.attr('data-source'),
      cur_card_type = field.attr('data-card_type'),
      cur_value = field.val();
      
      if(cur_value == ''){cur_value = '00'}
      
      var cur_prev_val = field.attr('data-prev_val'),
      cur_card = cur_card_type+'-'+cur_value,
      cur_prev_card = cur_card_type+'-'+cur_prev_val;
      
        menu_to_source(cur_obj);
        reset_connection(cur_source, cur_card, cur_prev_card);
        field.attr('data-prev_val', cur_value);
        recalc();
    } else {
      menu_to_source(cur_obj);
      recalc();
    }
    

  });

function menu_to_source(card) {

  var current = card,
      obj_top_pin = $('.details_upper_m').val(),
      obj_bottom_pin = $('.details_lower_m').val(),
      obj_chamber = $('.details_chamber').val(),
      card_type = $('.object_card_wrap').attr('data-card_type'),
      card_id = $('.details_id').val(),
      card_id_full = card_type+'-'+card_id;
  
      current.attr('data-top_pin', obj_top_pin);
      current.attr('data-bottom_pin', obj_bottom_pin);
      current.attr('data-chamber', obj_chamber);
  
  if(!current.hasClass('ghost')){
    current.attr('data-id', card_id);
    current.attr('data-id_full', card_id_full);
  }

  
      var outlet_options_array = [];
  
    $('.outlet_options').each(function() {
      var current_outlet = $(this),
      current_outlet_selected = current_outlet.find('.details_outlet option:selected'),
      current_outlet_identifier = current_outlet.find('.details_outlet').val(),
      current_outlet_name = current_outlet_selected.text(),
      current_outlet_unit = current_outlet_selected.attr('data-outlet_unit'),
      current_outlet_dia = current_outlet_selected.attr('data-outlet_diameter'),
      current_outlet_amount = current_outlet.find('.details_outlet_len').val(),
      current_outlet_target = current_outlet.attr('data-target');

      
      if(current_outlet_selected.attr('data-outlet_unit').toUpperCase() == 'KPL'){
        current_outlet.find('.details_outlet_len').prop( "disabled", true );
        current_outlet.find('.details_outlet_len_wrap .outlet_unit').text('kpl');
      } else if(current_outlet_selected.attr('data-outlet_unit').toUpperCase() == 'M'){
        current_outlet.find('.details_outlet_len').prop( "disabled", false );
        current_outlet.find('.details_outlet_len_wrap .outlet_unit').text('m');
      }
      
      
      if(current_outlet_selected.prop("disabled") == false){current_outlet.find('.create_checkpoint').removeClass('inactive');}
      
      outlet_options_array.push('["'+current_outlet_identifier+'", "'+current_outlet_name+'", "'+current_outlet_unit+'", "'+current_outlet_amount+'", "'+current_outlet_target+'", "'+current_outlet_dia+'"]');
    });
    
    current.attr('data-outlet_data', '['+outlet_options_array+']');

  
      var inlets_options_array = [];
  
    $('.inlets_options').each(function() {
      var current_inlet = $(this),
      current_inlet_selected = current_inlet.find('.details_inlets option:selected'),
      current_inlet_identifier = current_inlet.find('.details_inlets').val(),
      current_inlet_name = current_inlet.find('.details_inlets option:selected').text(),
      current_inlet_unit = current_inlet_selected.attr('data-outlet_unit'),
      current_inlet_amount = current_inlet.find('.details_inlets_len').val(),
      current_inlet_zip = current_inlet.find('.details_out_height').val(),
      current_inlet_back = current_inlet.attr('data-ownid'),
      current_inlet_target = current_inlet.attr('data-target');

      if(current_inlet_selected.prop("disabled") == true){$('.create_checkpoint[data-target="'+current_inlet_target+'"]').addClass('inactive');}

      if(current_inlet_selected.attr('data-outlet_unit').toUpperCase() == 'KPL'){
        current_inlet.find('.details_inlets_len').prop( "disabled", true );
        current_inlet.find('.details_inlets_len_wrap .inlets_unit').text('kpl');
      } else if(current_inlet_selected.attr('data-outlet_unit').toUpperCase() == 'M'){
        current_inlet.find('.details_inlets_len').prop( "disabled", false );
        current_inlet.find('.details_inlets_len_wrap .inlets_unit').text('m');
      }
      
      inlets_options_array.push('["'+current_inlet_identifier+'", "'+current_inlet_name+'", "'+current_inlet_unit+'", "'+current_inlet_amount+'", "'+current_inlet_back+'", "'+current_inlet_zip+'"]');

    });
  
    current.attr('data-inlet_data', '['+inlets_options_array+']');
  
    current.find('.addons').html('');

    $('.checkbox_wrap :checkbox:checked').each(function() {
      var current_checkbox = $(this),
      checkbox_code = current_checkbox.val(),
      checkbox_id = current_checkbox.attr('data-id');
      current.find('.addons').append('<div data-id="'+checkbox_id+'" data-code="'+checkbox_code+'"></div>');
    });
  
    $('.radio_wrap [type=radio]:checked').each(function() {
      var current_radio = $(this),
      radio_code = current_radio.val(),
      radio_id = current_radio.attr('data-id'),
      radio_frame_unit = current_radio.attr('data-frame_unit'),
      radio_frame_dia = current_radio.attr('data-frame_diameter'),
      radio_frame_amount = current_radio.attr('data-frame_amount');
      
      current.attr('data-frame_unit', radio_frame_unit);
      current.attr('data-frame_diameter', radio_frame_dia);
      current.attr('data-frame_amount', radio_frame_amount);
      
      
      current.find('.addons').append('<div data-id="'+radio_id+'" data-code="'+radio_code+'"></div>');
    });

}



  $(document).on('click', '#send_codes', function(e) {
    e.preventDefault();
    var check = confirm("Oletko varma?");
      if (check == true) {
        final_code();
      }
  });

function final_code() {

  $('#code_warnings').html('');
  
  var wells = [];
  var fail = true;

  $('.object').not('.ghost').each(function() {

      var obj = $(this);
    
      var obj_id_full = obj.attr('data-id_full'),
          obj_height_ground = obj.attr('data-top_pin'),
          obj_height_water = obj.attr('data-bottom_pin'),
          obj_height_chamber = obj.attr('data-chamber'),
          obj_target = obj.attr('data-target'),
          obj_mapy = obj.attr('data-mapy'),
          obj_mapx = obj.attr('data-mapx'),
          obj_wellgroup = obj.attr('data-identifier'),
          obj_order_id = obj.attr('data-order_identifier');
    
    if(obj.hasClass('notice')){
        fail = true;
        $('#code_warnings').append('<div class="warning_note">'+obj_id_full+': Poiston tyyppi puuttuu!</div>');
    }
        
    if(obj.hasClass('notice2')){
        fail = true;
        $('#code_warnings').append('<div class="warning_note">'+obj_id_full+': Kaato negatiivinen!</div>');
    }
    
    if(obj.hasClass('notice3')){
        fail = true;
        $('#code_warnings').append('<div class="warning_note">'+obj_id_full+': Kohdekaivon tulon tyyppi puuttuu!</div>');
    }

    if(obj_order_id == '-'){
        obj_order_id = '';
    }
    
    var card_code = [];
    var card_ingredients_json = [];
    
        obj.find('.middle').each(function(index) {

            var current_outpipe = $(this),
                outpipe_code = current_outpipe.attr('data-outlet_id'),
                outpipe_amount = current_outpipe.attr('data-amount'),
                outpipe_target = current_outpipe.attr('data-target'),
                outpipe_height = 0,
                outpipe_angle = 0,
                outpipe_drop = 0,
                pipe_direction = 1,
                checkpoint_data = [];

            var current_target = $('.object[data-id_full="'+outpipe_target+'"]');

                if(current_target.hasClass('ghost')){

                    var sources = current_target.attr('data-sources');
                    
                    $('.object[data-sources="'+sources+'"]').each(function() {
                        var ghost_obj = $(this),
                            go_mapx = parseFloat(ghost_obj.attr('data-mapx')).toFixed(2),
                            go_mapy = parseFloat(ghost_obj.attr('data-mapy')).toFixed(2);

                        var checkpoint = [go_mapx,go_mapy];
                        checkpoint_data.push(checkpoint);
                    });

                }

            
            if(index > 0){
                outpipe_angle = current_outpipe.attr('data-point_dir');
                outpipe_drop = parseFloat(current_outpipe.attr('data-drop')).toFixed(2);
                pipe_direction = 2;
            }


            var card_ingredients = {'code': outpipe_code, 'amount': outpipe_amount, 'height': outpipe_height, 'angle': outpipe_angle, 'drop': outpipe_drop, 'linked_well_id': outpipe_target, 'link_details': [{'direction': pipe_direction, 'checkpoints': checkpoint_data}]};
            card_ingredients_json.push(card_ingredients);
        });


        obj.find('.addons div').each(function() {
            var current_addon = $(this),
                addon_code = JSON.parse(decodeURIComponent(current_addon.attr('data-code')));
                
            card_ingredients_json.push(addon_code);
        });

    
        obj.find('.inlet_wrap div').each(function() {
          
            var current_inpipe = $(this),
                inpipe_code = current_inpipe.attr('data-inlet_id'),
                inpipe_amount = current_inpipe.attr('data-amount'),
                inpipe_height = current_inpipe.attr('data-zip'),
                inpipe_angle = current_inpipe.attr('data-inang'),
                inpipe_coming_from = current_inpipe.attr('data-coming_from'),
                inpipe_drop = parseFloat(current_inpipe.attr('data-drop')).toFixed(2),
                pipe_direction = 3;
        
            var card_ingredients = {'code': inpipe_code, 'amount': inpipe_amount, 'height': inpipe_height, 'angle': inpipe_angle, 'drop': inpipe_drop, 'linked_well_id': inpipe_coming_from, 'link_details': [{'direction': pipe_direction}]};
                
            card_ingredients_json.push(card_ingredients);
        });
    
      card_code = {'identifier': obj_id_full, 'pos_x': obj_mapx, 'pos_y': obj_mapy, 'id': obj_order_id, 'height_ground': obj_height_ground, 'height_water': obj_height_water, 'height_sp': obj_height_chamber, 'wellgroup': obj_wellgroup, 'wellingredients': card_ingredients_json};

      $('.well_order_link').remove();

      wells.push(card_code);
    
  });
  
      if(fail == false){
        
        api.save_wells(
          wells,
          function(o) {
            console.log(o);
            var order_id = $('#content').attr('data-wellorder-reference');
            window.open('https://dev-ccs.kaivokortti.fi/heavyuser_wellorders/'+order_id);         
        }, function(o) {
            console.log('Failure');
        });
        
      }

}


  var mousedown = false;
  
  $(document).on('mousedown', '.object', function(e) {
    mousedown = true;
  });
  
  $(document).on('mouseup', '.object', function(e) {
    mousedown = false;
    setTimeout(function(){recalc()}, 200);
  }); 
  
  
	$(document).on('mousemove mouseout', '.object', function(e) {
		if(e.target != this) return;
		
    
    if(mousedown == true){

    var obj = $(this);
    
  if(e.which === 1){
      instance.pause();

      posX = map_zoom_wrap.offset().left,
      posY = map_zoom_wrap.offset().top;

      remember_top = (e.pageY - posY)/zoomer;
      remember_left = (e.pageX - posX)/zoomer;
       
      var map_tp = (remember_top-13)/(middle_point.position().top*2/zoomer)*100,
      map_lp = (remember_left-13)/(middle_point.position().left*2/zoomer)*100;

      obj.css({'top': map_tp+'%', 'left': map_lp+'%'});

      obj.attr('data-mapy', map_tp).attr('data-mapx',map_lp);

      recalc();

    }
    
    instance.resume();
    
    }
	});




  var i_top = 0, i_top_calc = 0;
  var i_left = 0, i_left_calc = 0;
  
instance.on('transform', function(e) {
  i_top = instance.getTransform().y;
  i_left = instance.getTransform().x;
  i_top_calc = ($(window).height()/2 - i_top)/zoomer;
  i_left_calc = ($(window).width()/2 - i_left)/zoomer;
  
  var map_tp = (i_top_calc-13)/(middle_point.position().top*2/zoomer)*100,
      map_lp = (i_left_calc-13)/(middle_point.position().left*2/zoomer)*100;
  
  var ap_top = Math.round(map_tp);
  var ap_left = Math.round(map_lp);
  
  var hooked_obj = $('.object.hooked');

  if(hooked_obj){
    hooked_obj.css({'top': map_tp+'%', 'left': map_lp+'%'});
    hooked_obj.attr('data-mapy', map_tp).attr('data-mapx',map_lp); 
    recalc();
  }


});


  $(document).on('click', '#release_hook', function(e) {
    e.preventDefault();
    $(this).removeClass('active');
    $('.object').removeClass('hooked');
  });


  var tapped = false;

  $(document).on("touchstart", '.object', function(e) {

      if(!tapped){ 
        tapped=setTimeout(function(){
            tapped = null;
        },300);
      } else {
        clearTimeout(tapped);
        tapped = null;

      var hooked_element = $(this);

        if(hooked_element.hasClass('hooked')){
          $('.object').removeClass('hooked');
        } else {
          $('.object').removeClass('hooked active');
          hooked_element.addClass('hooked');
          $('#release_hook').addClass('active');
          close_options();
        }

      }
      e.preventDefault()
  });


$(document).on('click', '.warning', function(e) {
    e.preventDefault();
    $(this).removeClass('active');
});


layout();












//csv


function uploadDealcsv () {}; 

  uploadDealcsv.prototype.getCsv = function(e) {
       
      let input = document.getElementById('csv_upload');
      input.addEventListener('change', function() {

        if (this.files && this.files[0]) {

            var myFile = this.files[0];
            var reader = new FileReader();
            
            reader.addEventListener('load', function (e) {
                
                let csvdata = e.target.result; 
                parseCsv.getParsecsvdata(csvdata);
            });
            
            reader.readAsBinaryString(myFile);
        }
      });
    }

    uploadDealcsv.prototype.getParsecsvdata = function(data) {

        var headers = [];
        var parsedata = [];
        
        var newLinebrk = data.split("\n");
        
        for(var i = 0; i < newLinebrk.length; i++) {
            parsedata.push(newLinebrk[i].split(";"));
        }
        
        for(var row = 1; row < parsedata.length; row++) {

            var csv_card_data = '';
            var frame_id = 0;
            
            for(var row_col = 0; row_col < parsedata[row].length; row_col++) {
                
                var row_col_key = parsedata[0][row_col];
                var row_col_val = parsedata[row][row_col];
                var breaks = /\r/.exec(row_col_val);
                
                if(!breaks && row_col_val !== ""){
                    
                    if(row_col_key == 'outlet_diameter'){
                        csv_card_data += '<div class="csv_outlet_wrap">';
                    }
                    
                    if(row_col_key == 'inlet1_diameter' || row_col_key == 'inlet2_diameter' || row_col_key == 'inlet3_diameter' || row_col_key == 'inlet4_diameter'){
                        csv_card_data += '<div class="csv_inlet_wrap">';
                    }
                    
                    csv_card_data += '<div data-key="'+row_col_key+'" data-value="'+row_col_val+'"></div>';
                    
                    if(row_col_key == 'name' || row_col_key == 'height' || row_col_key == 'qty'){
                        csv_card_data += '<label data-header="'+row_col_key+'">'+row_col_key+': <input class="csv_input" type="text" name="" value="'+row_col_val+'"></label>';
                        
                    }      
                    
                    
                    if(row_col_key == 'outlet_angle' || row_col_key == 'inlet1_angle' || row_col_key == 'inlet2_angle' || row_col_key == 'inlet3_angle' || row_col_key == 'inlet4_angle'){
                        csv_card_data += '</div>';
                    }
                    
                }
                
                if(row_col_key == 'item_number'){
                    frame_id = row_col_val;    
                }
                
            }

            if(frame_id !== 0){
                var csv_card = '<div class="csv_card" data-frame_id="'+frame_id+'">'+csv_card_data+'</div>';
                $('.import_csv').append(csv_card);   
            }

        }


    }
  
  var parseCsv = new uploadDealcsv();
  parseCsv.getCsv();

