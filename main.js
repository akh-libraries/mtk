
var new_layout = '<div id="map_inputs">'+
    '<div>'+
        '<a href="#" class="btn instructions">Ohjeet</a>'+
        '<a href="#" class="btn calculations">'+I18n.t("zoning.show.counts")+'</a>'+
		'<a href="#" class="btn" id="print_plan">Tulosta kuva+kaivopaikat</a>'+
        '<a href="#" class="btn" id="send_codes">Lähetä kaivot ccs:ään</a>'+
    '</div>'+
    '<div id="object_scale_wrap">'+I18n.t("zoning.show.object_scale")+':'+
        '<select id="object_scale" name="object_scale">'+
        '<option value="2">100%</option>'+
        '<option value="2.5">125%</option>'+
        '<option value="3">150%</option>'+
        '<option value="3.5">175%</option>'+
        '<option value="4">200%</option>'+
        '</select>'+
    '</div>'+
    '<label>'+I18n.t("zoning.show.default_ground_val")+':<input class="default_ground_val" type="text" name="default_ground_val" value="12.50"></label>'+
    '<label>'+I18n.t("zoning.show.default_bottom_val")+':<input class="default_bottom_val" type="text" name="default_bottom_val" value="11.50"></label>'+
    '<label>'+I18n.t("zoning.show.map_scale")+', 1 :<input id="map_scale" type="text" name="map_scale" value="200"></label>'+
    '<label>'+I18n.t("zoning.show.multiplier")+':<input id="multiplier" type="text" name="multiplier" value="10"></label>'+
    '<div id="code_warnings"></div>'+
'</div>'+
'<h2 class="slot_title">'+I18n.t("zoning.show.plan")+'</h2>'+
'<div id="map_overflow_wrap">'+
    '<a href="#" class="fullscreen_button"><span></span></a>'+
    '<div id="map_wrap">'+
        '<div id="map_zoom_wrap">'+
            '<div id="map">'+
                '<div id="center_point"></div>'+
                '<img class="pdf_image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAABCAQAAACx6dw/AAAADUlEQVR42mP8/58BCAALAwIAxXfYpQAAAABJRU5ErkJggg==" alt="map" />'+
                '<canvas id="pdf-canvas" style="display:none;"></canvas>'+
                '<div id="objects_wrap">'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>'+
'</div>'+
'<div id="inlet_list_wrap" style="display:none;"></div>'+
'<div id="menu">'+
    '<a href="#" class="menu_toggle"></a>'+
    '<div id="menu_items"></div>'+
'</div>'+
'<div id="options"></div>'+
'<a href="#" id="release_hook">Vapauta</a>'+
'<a href="#" id="close_options">'+I18n.t("zoning.commands.close_options")+'</a>'+
'<div id="counts">'+
    '<a href="#" class="close_pop">x</a>'+
    '<div><div class="counter_title">'+I18n.t("zoning.show.count_measure")+':</div> <span id="measure"></span></div>'+
    '<div><div class="counter_title">'+I18n.t("zoning.show.count_wells")+':</div> <span id="count"></span></div>'+
'</div>'+
'<div id="inst">'+
    '<a href="#" class="close_pop">x</a>'+
    '<div>'+
		'<h2>Massoitustyökalun ohjeet</h2>'+
			'<h3>Hiiren käyttö</h3>'+
			'<ul>'+
			'<li>Karttaa liikutetaan / objekteja siirretään pitämällä hiiren vasenta painiketta pohjassa</li>'+
			'<li>Oikean napin painallus lisää kartalle objektin / avaa objektin valikon</li>'+
			'<li>Rullalla zoomaillaan</li>'+
			'</ul>'+

			'<h3>Näin pääset alkuun</h3>'+
			'<ol>'+
			'<li>Lataa sivulle kuva asemakaavasta ja tarkista että mittakaava on oikea</li>'+
			'<li>Valitse vasemmasta valikosta kartalle lisättävä kaivo</li>'+
			'<li>Lisää kaivoja kartalle klikkaamalla karttaa hiiren oikealla painikkeella</li>'+
			'<li>Kaivoa voi liikutella pitämällä hiiren vasenta painiketta pohjassa</li>'+
			'<li>Klikkaa hiiren oikealla napilla kaivoa avataksesi tämän valikon</li>'+
			'<li>Kun kaivon valikko on auki, niin voit yhdistää kaivon muihin kaivoihin</li>'+
			'<li>"Nollaa poistot"-nappi on ainoa tapa poistaa kaivosta poisto/poistot</li>'+
			'<li>Etene valikkoa järjestyksessä, huomaa että valikosta on mahdollista valita liikaa osia</li>'+
			'<li>Ulkopuolista yhdettä tulee käyttää ainoastaan silloin, kun kaivolla on ulkopuolinen yhteys</li>'+
			'<li>Ulkopuolinen poistoyhde asettaa kaivon nollan suunnan, tulo käyttäytyy normaalina yhteenä, ulkopuoliset yhteet rajattu yhteen per kaivo</li>'+
			'<li>Jos kaivoihin on jäänyt virheitä, niin lähettäminen CCS:ään ei onnistu</li>'+
			
			'</ol>'+

			'<h3 class="notice_color">Seuraavien asioiden muokkaaminen manuaalisesti CCS:ssä estää tilauksen avautumisen massoituksessa</h3>'+
			'<ul class="notice_color">'+
			'<li>Kaivo id:n vaihtaminen</li>'+
			'<li>Kaivon poisto tai lisäys</li>'+
			'<li>Tulon/poiston poistaminen</li>'+
			'</ul>'+
			'<p class="notice_color">Huom. Jos kaivot on alunperin lisätty massoitustyökalulla, tee muokkaukset myös massoitustyökalulla</p>'+

			'<h3>Ominaisuudet / ota huomioon</h3>'+
			'<ul>'+
			'<li>Kirjoita "kaivonumero/id"-kenttään vain kaivonumero, kaivon tyyppi haetaan automaattisesti</li>'+
			'<li>Kaivolle ei ole määritelty poistoa = nolla otetaan pohjoisesta</li>'+
			'<li>Ulkoinen yhde on tulo = irrallinen yhde jolla asteet menee kaivon suunnan mukaan</li>'+
			'<li>Ulkoinen yhde on poisto = kaivoon liitetyt yhteet ottavat nollan siitä</li>'+
			'<li>Ulkoisia yhteitä käytetään vain jos kaivo liittyy johonkin vanhaan linjaan</li>'+
			'<li>Ulkoinen poisto-yhde estää kaivoa yhdistämästä linjaa muihin kaivoihin/jos on määritelty linja niin ulkoista poistoa ei voi lisätä</li>'+
			'<li>Kaivolle voi antaa useamman poiston, kakkospoisto näkyy ccs:ssä tulona, mutta siirtyy massoituksessa takaisin kakkospoistoksi</li>'+
			'<li>Kakkospoisto estää antamasta "etappimerkintää" ykköspoistolle</li>'+
			'<li>Etappimerkintä nappi häviää jos se on jo määritelty ja kyseisen kaivon valikon avaa uudelleen</li>'+
			'</ul>'+
	'</div>'+
'</div>'+
'<span class="spinner"></span>'+
'<a href="#" class="warning active"><span class="screen_arrow">&#10554;</span><span class="screen_w"></span><span class="screen_h"></span></a>';

$('#zoning_app').html(new_layout);
$('.container').addClass('container-fluid').removeClass('container');

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
      close_options_button = $('#close_options'),
	  base_url = window.location.origin;

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
	  
	  
var helper = null;
var api;
var wor = $('#content').attr('data-wellorder-reference');

(function () {
       window.api = ZoningData();
})();

  api.categories(function(o) {
      console.log(o);
      helper = api.category_helper(o.categories);
  }, function(o) {
      console.log('Failure');
      console.log(o);
  });
  
  api.wellgroups(function(o) {

        var tags = '<a href="#" class="tag obj_eraser" data-warning_msg="Huom. Olet poistamassa kaivoja!">'+I18n.t("zoning.commands.eraser")+'</a>';

        o.sort((a, b) => a.name.localeCompare(b.name))
    
        $.each(o, function(i, item) {
			if(o[i].disabled !== true){
				tags += '<a href="#" class="tag" data-type="'+o[i].product_family.toUpperCase()+'" data-factory="'+o[i].factory+'" data-identifier="'+o[i].identifier+'">'+o[i].name+'</a>';
			}
        });

        $('#menu_items').append(tags);
    
      }, function(o) {
          console.log('Failure');
      });

    window.addEventListener('resize', function(event){
        recalc();
    });

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
    

    if(field.is('select')){
      field.find('option').removeAttr('selected');
      field.find('option[value="'+cur_value+'"]').attr('selected','selected').prop('selected',true);
    }
    
	menu_to_source($('.object.active'));
	recalc();
	
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
  

function load_inlet_list(order_json) {
	
	var inlet_list_wrap = $('#inlet_list_wrap');
	var well_ids = [];
	var order = order_json;

	for (var i = 0; i < order.length; i++) {
		var obj_wellgroup = order[i].wellgroup;
		well_ids.push(obj_wellgroup);
	}

	//es5 change
	var unique_chamber = well_ids.filter((item, i, ar) => ar.indexOf(item) === i);
	
	var inlet_set_1 = helper.category_and_children(helper.find_category_by_path(['yhde', 'poisto']));
	var inlet_set_2 = helper.category_and_children(helper.find_category_by_path(['yhde', 'tulo_tai_poisto']));

	$.each(unique_chamber, function( key, value ) {
		
		api.wellingredients(
			value,
			function(o) {
				var json_set_1 = helper.filter_ingredients_by_categories(o, inlet_set_1);
				var json_set_2 = helper.filter_ingredients_by_categories(o, inlet_set_2);
				
				$.each(json_set_1, function(i, item) {
					var found = inlet_list_wrap.find('.inlet[data-id="'+json_set_1[i].code+'"]').length;
					if(!found){inlet_list_wrap.append('<span class="inlet" data-id="'+json_set_1[i].code+'" data-title="'+json_set_1[i].name.toUpperCase()+'" data-diameter="'+json_set_1[i].diameter+'" data-unit="'+json_set_1[i].unit+'"></span>');}
				});
				
				$.each(json_set_2, function(i, item) {
					var found = inlet_list_wrap.find('.inlet[data-id="'+json_set_2[i].code+'"]').length;
					if(!found){inlet_list_wrap.append('<span class="inlet" data-id="'+json_set_2[i].code+'" data-title="'+json_set_2[i].name.toUpperCase()+'" data-diameter="'+json_set_2[i].diameter+'" data-unit="'+json_set_2[i].unit+'"></span>');}
				
					if(key+1 >= unique_chamber.length && i+1 >= json_set_2.length){
						setTimeout(function(){ reload_order(order); }, 2000);
					}
				
				});
				
			}
			
		);
		
	});
	
}

function reload_order(order_json) {

	try {
		var order = order_json;
			
		for (i = 0; i < order.length; i++) {

		var obj_id_full = order[i].identifier,
			obj_wellgroup = order[i].wellgroup,
			obj_title = $('.tag[data-identifier="'+obj_wellgroup+'"]').text(),
			obj_type = $('.tag[data-identifier="'+obj_wellgroup+'"]').attr('data-type'),
			obj_id = obj_id_full.replace(obj_type+'-', ''), 
			obj_posx = order[i].pos_x,
			obj_posy = order[i].pos_y,
			obj_ingredients = order[i].ingredients;

		var outlet_div = '',
			inlet_div = '',
			addon_data = '',
			target_data = '';

		var final_val_outs = [];
		var final_val_ins = [];
		var ghost = '';
		// ingrarraysedients 
		
		for(var z = 0; z < obj_ingredients.length; z++) {
			var current_row = obj_ingredients[z];

			//is there a link?
			var link = current_row.link_details;
			
			// inlet or outlet
			if(link){

				var read_link = JSON.parse(decodeURIComponent(link));
				var link_type = read_link['type'];
				var linked_to = read_link['linked_to'];
				var checkpoint_data = read_link['checkpoints'];
				var final_destination = linked_to;
				
				
				var inlet_data = $('#inlet_list_wrap .inlet[data-id="'+current_row.ingredient+'"]');
				
				var inlet_title = inlet_data.attr('data-title'),
					inlet_unit = inlet_data.attr('data-unit'),
					inlet_dia = inlet_data.attr('data-diameter');

				//outlet, append to outlets
				if(link_type == '1'){
					
					if(checkpoint_data && checkpoint_data !== ''){
						
						//build checkpoints
						for(var c = 0; c < checkpoint_data.length; c++) {
							var runner = 1+c;
							
							final_destination = read_link['fd'];
							ghost += '<span data-id="'+obj_id+'-'+runner+'" data-id_full="gst-'+obj_id_full+'-'+runner+'" data-next_id="gst-'+obj_id_full+'-'+(runner-1)+'" data-left="'+checkpoint_data[c][0]+'" data-top="'+checkpoint_data[c][1]+'" data-sources="'+obj_id_full+','+final_destination+'"></span>';
						}
					}
					
					target_data += linked_to+',';
					outlet_div += '<div data-inlet_id="'+current_row.ingredient+'" data-target="'+final_destination+'" data-amount="'+current_row.amount+'" data-zip="'+current_row.height+'" class="middle"><span></span></div>';

					final_val_outs.push('["'+current_row.ingredient+'", "'+inlet_title+'", "'+inlet_unit+'", "'+current_row.amount+'", "'+final_destination+'", "'+current_row.height+'", "'+inlet_dia+'"]');

				} else if(link_type == '2'){ // outlet 2, append to outlets
	  
					target_data += linked_to+',';
					outlet_div += '<div data-inlet_id="'+current_row.ingredient+'" data-target="'+linked_to+'" data-amount="'+current_row.amount+'" data-zip="'+current_row.height+'" class="middle"><span></span></div>';
					
					final_val_outs.unshift('["'+current_row.ingredient+'", "'+inlet_title+'", "'+inlet_unit+'", "'+current_row.amount+'", "'+linked_to+'", "'+current_row.height+'", "'+inlet_dia+'"]');
					
					
				} else if(link_type == '3'){ // inlet, append to inlets
					
					inlet_div += '<div data-inlet_id="'+current_row.ingredient+'" data-coming_from="'+linked_to+'" data-amount="'+current_row.amount+'" data-zip="'+current_row.height+'"></div>';
					final_val_ins += '<div data-going_to="'+linked_to+'">["'+current_row.ingredient+'", "'+inlet_title+'", "'+inlet_unit+'", "'+current_row.amount+'", "'+linked_to+'", "'+current_row.height+'", "'+inlet_dia+'"]</div>';
		
				} else if(link_type == '4' || link_type == '5'){ // inlet/outlet outside

					var link_index = read_link['index'];;
					addon_data += '<div class="extra_outlet" data-index="'+link_index+'" data-type="'+link_type+'" data-title="'+inlet_title+'" data-pos_y="'+JSON.parse(checkpoint_data)[0]+'" data-pos_x="'+JSON.parse(checkpoint_data)[1]+'" data-code="'+current_row.ingredient+'" data-amount="'+current_row.amount+'" data-height="'+current_row.height+'" data-angle="'+current_row.angle+'" data-drop="'+current_row.drop+'" data-id="'+current_row.id+'"></div>';

				}

			} else { // standard part, append to addons
				
				addon_data += '<div data-id="'+current_row.ingredient+'" data-code="'+encodeURIComponent(JSON.stringify({"code": current_row.ingredient, "amount": current_row.amount, "height": current_row.height, "angle": current_row.angle, "drop": current_row.drop, "id": current_row.id}))+'"></div>';

			}

		}

			var new_card_info = ' data-type="'+obj_type+'"'+
								' data-id="'+obj_id+'"'+
								' data-id_full="'+obj_id_full+'"'+
								' data-identifier="'+obj_wellgroup+'"'+
								' data-order_identifier="'+order[i].id+'"'+
								' data-title="'+obj_title+'"'+
								' data-top_pin="'+order[i].height_ground+'"'+
								' data-bottom_pin="'+order[i].height_water+'"'+
								' data-chamber="0"'+
								' data-target="'+target_data.replace(/,\s*$/, "")+'"'+
								' data-angle="0"'+
								' data-mapy="'+obj_posy+'"'+
								' data-mapx="'+obj_posx+'"';

			var new_card =  '<span '+new_card_info+' class="object" style="top:'+obj_posy+'%;left:'+obj_posx+'%;transform: scale('+scale_factor/zoomer+','+scale_factor/zoomer+')">'+
			
							'<span class="outlet_out">['+final_val_outs+']</span>'+
							'<span class="outlet_in"></span>'+

							'<div class="pre_inlet_placeholder">'+final_val_ins+'</div>'+
							'<div class="ghost_placeholder">'+ghost+'</div>'+
					
							'<span class="outlet_wrap center">'+outlet_div+'</span>'+
							'<span class="inlet_wrap">'+inlet_div+'</span>'+
							'<span class="addons">'+addon_data+'</span>'+
							'<a href="#" class="connect"><span class="connect_txt">Yhdistä</span><span class="disconnect_txt">Nollaa poistot</span></a>'+
							'</span>';

			$('#objects_wrap').append(new_card);

		}

		finalize_reload();

	} 

	catch(err) {
		
		$('#send_codes').remove();
		alert('Ohjelma on havainnut virheitä kaivojen tiedoissa (kaivoja muokattu manuaalisesti CCS:n puolelta) ja estänyt uudelleenlatauksen lisävahinkojen välttämiseksi. Vältät tämän tilanteen muokkaamalla alunperin massoitustyökalun kautta tehdyt kaivot massoitustyökalun kautta');
		
	}

}

    function finalize_reload() {

	let well_ids = [];

        $('.object').each(function() {
        
        var current = $(this);
		
		well_ids.push(current.attr('data-identifier'));
		
            current.find('.pre_inlet_placeholder div').each(function() {
            
                var current_obj = $(this);
                var current_html = current_obj.html()+',';
                var appending_obj = current_obj.attr('data-going_to');
                
                $('.object[data-id_full="'+appending_obj+'"]').find('.outlet_in').append(current_html);
            
            });
            
            current.find('.pre_inlet_placeholder').remove();
        
        });
        
        $('.object').each(function() {
        
            var current = $(this);
            var current_wrap = current.find('.outlet_in');
            
            var current_html = current_wrap.html();
            var new_html = current_html.replace(/,\s*$/, "");
                
            current_wrap.html('['+new_html+']');
            
                current.find('.ghost_placeholder span').each(function(index) {
            
                    var cloned_parent = $(current.clone());
                    
                    var current_gst = $(this);
                    var runner = index;
                    
                    var data_id = current_gst.attr('data-id'),
                        data_id_full = current_gst.attr('data-id_full'),
                        data_left = current_gst.attr('data-left'),
                        data_top = current_gst.attr('data-top'),
                        data_sources = current_gst.attr('data-sources').split(','),
                        next_target = '';

                    if(index == 0){
                        next_target = data_sources[1];
                    } else {
                        next_target = current_gst.attr('data-next_id');
                    }

                    var new_bottom_pin = parseFloat(current.attr('data-bottom_pin')) - 0.02;
                    
                    
                    cloned_parent.attr('data-id', data_id);
                    cloned_parent.attr('data-id_full', data_id_full);
                    cloned_parent.attr('data-sources', data_sources);
                    cloned_parent.attr('data-target', next_target);
                    cloned_parent.attr('data-bottom_pin', new_bottom_pin.toFixed(2));
                    cloned_parent.css({"left": data_left+'%', "top": data_top+'%'});
                    
                    cloned_parent.addClass('ghost');
                    
                    $('#objects_wrap').append(cloned_parent);
                    
                });
            
            current.find('.ghost_placeholder').remove();
            
        });

		setTimeout(function(){recalc();}, 500);
        
    }
  
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
	
	setTimeout(function(){create_menu_from_source(active_wrap);}, 500);

	
	});




	var timestamp = 0;

	function get_time() {
		let timestamp_now = Math.floor(Date.now());
		return timestamp_now;
	}

	function set_time() {
		timestamp = get_time();
	}


var pin_counter = 1;

function recalc() {
  
if(timestamp+50 > get_time()){

} else {

try {
	 
	$('.object').removeClass('notice notice2 notice3');

	measure_wrap.html('');
	$('.inlet_wrap').html('');
	$('.center').html('');
	$('.pin').remove();
  
	pin_counter = 1;
  
	var dist;
    
  $('.object').each(function() {
	
  var object = $(this);


  var card_id_full = object.attr('data-id_full'),
      card_type = object.attr('data-type'),
      card_top_pin = object.attr('data-top_pin'),
      card_bottom_pin = object.attr('data-bottom_pin'),
      card_target = object.attr('data-target'),
      card_outlet_data = object.find('.outlet_out').text(),
      card_inlet_data = object.find('.outlet_in').text(),
      own_mid = object.find('.center').offset(),
	  card_angle = parseFloat(object.attr('data-angle'));

	var p2 = {
		x: own_mid.top,
		y: own_mid.left
	};

	object.find('.addons .extra_outlet').each(function() {
	   
			var extra_outlet = $(this),
				extra_type = extra_outlet.attr('data-type');

			$('#objects_wrap').append('<span class="pin pin'+pin_counter+'" style="transform:scale('+scale_factor/zoomer+','+scale_factor/zoomer+');left:'+extra_outlet.attr('data-pos_x')+'%;top:'+extra_outlet.attr('data-pos_y')+'%;"></span>');
			
			var pin_offset = $('.pin'+pin_counter).offset();
			
			var px = {
				x: pin_offset.top + 13,
				y: pin_offset.left + 13
			};
			
			var e_angle = Math.atan2(px.y - p2.y, px.x - p2.x) * 180 / Math.PI,
				final_e_ang = parseInt((180-card_angle)+(e_angle*-1));

			if(e_angle < 0){
			  e_angle = e_angle+360;
			  final_e_ang = 360-(360-final_e_ang);
			} 

			if(final_e_ang < 0 || final_e_ang == e_angle){
			  final_e_ang = final_e_ang+360;
			}

			if(final_e_ang == 540){
			  final_e_ang = 180;
			}
			
			var ax = px.x - p2.x;
			var bx = px.y - p2.y;

			distx = Math.sqrt(ax*ax + bx*bx);

			extra_outlet.attr('data-wrap_angle', (180 + e_angle*-1)).css({'height': (distx*scale_factor/2)*(zoomer)/(scale_factor*zoomer)+'px', 'transform': 'rotate('+(360 - e_angle)+'deg)'});

			if(extra_type == '5'){
				extra_outlet.attr('data-angle', '0');
				card_angle = final_e_ang;
			} else {
				extra_outlet.attr('data-angle', final_e_ang);
			}
			

		pin_counter++;
		
	});

    
    if (typeof card_outlet_data !== undefined && card_outlet_data.length > 0) {
        card_outlet_data = JSON.parse(card_outlet_data);
    }
    
    if (typeof card_inlet_data !== undefined && card_inlet_data.length > 0) {
        card_inlet_data = JSON.parse(card_inlet_data);
    }
    
    
    var target_array = card_target.split(",");
    
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

        var a = p1.x - p2.x;
        var b = p1.y - p2.y;

        dist = Math.sqrt(a*a + b*b);
        var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
        var target_ang = parseInt(target.attr('data-angle'));
		
		if(target.find('.addons .extra_outlet[data-type="5"]').length !== 0){
			target_ang = parseInt(target.find('.addons .extra_outlet[data-type="5"]').attr('data-wrap_angle'));
			
			if(target_ang < 0){target_ang = target_ang+360}
		} 
		
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

        if(target_array[i] == target_array[0]){
            object.attr('data-angle', 360-angleDeg);    
        }

        var drop_per_meter = 0;
        var inlet_build_info = 'data-inlet_id="ei valittu" data-amount="1" data-inlet_name="ei valittu" data-coming_from="'+card_id_full+'"';
        var outlet_build_info = 'data-inlet_id="ei valittu" data-amount="1"';
        var outlet_dia = 0;


        //missing inlet?
        object.addClass('notice3');
          
        if (card_inlet_data.length > 0 && card_inlet_data[i] !== undefined) {
          
            //missing inlet = nope
            object.removeClass('notice3');
          
          if (card_inlet_data[i][0] !== 'null') {
            
            inlet_build_info = 'data-inlet_id="'+card_inlet_data[i][0]+'" data-inlet_name="'+card_inlet_data[i][1]+'" data-amount="'+card_inlet_data[i][3]+'" data-coming_from="'+card_id_full+'"';
            drop_per_meter = ((parseFloat(card_bottom_pin)*100 + parseFloat(card_outlet_data[i][5])) - (parseFloat(target_bottom_pin)*100 + parseFloat(card_inlet_data[i][5])))/(dist*map_size);

            if(drop_per_meter < 0){
              //negative drop = nope
              object.addClass('notice2'); 
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
            outlet_dia = card_outlet_data[i][6];

          }
        }

        target_inlets = $('<div '+inlet_build_info+' data-drop="'+drop_per_meter+'" data-zip="'+zip_height+'" data-inang="'+final_in+'"></div>');

        target_inlet_wrap.prepend(target_inlets);


        var middle_build = $('<div '+outlet_build_info+' data-drop="'+drop_per_meter+'" data-target="'+target_array[i]+'" data-point_dir="'+(360-angleDeg)+'" class="middle" style="transform:rotate('+(360-angleDeg)+'deg);"><span data-dia="'+outlet_dia+'" data-com="'+final_in+'" style="height:'+(dist-100*scale_factor/2)*(zoomer)/(scale_factor*zoomer)+'px;"></span></div>');
        object.find('.outlet_wrap').append(middle_build);


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
  
  catch(err){
	  console.log(err);
  }
  
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
        count_wrap.append('<div class="obj_counter" data-count="1" data-title="'+obj_title+'">yht: <span class="obj_total">'+obj_height.toFixed(2)+'</span> m, keskiarvo: <span class="obj_avg"></span> m</div>');               
    }

  });

  }
  
  $(document).on('click', '#close_options', function(e) {
    e.preventDefault();
    $('.object').removeClass('active');
    close_options();
  });
  
	$(document).on('contextmenu', '.object', function(e){
    
	var clicked_obj = $(this);
    
    if($('.obj_eraser').hasClass('active')){
       delete_obj(clicked_obj);
    } else {

		body.removeClass('prevent_outs').addClass('view_options');
      
      $('.object').removeClass('active');
      clicked_obj.addClass('active');
	  
		if(clicked_obj.find('.extra_outlet[data-type="5"]').length !== 0){
			body.addClass('prevent_outs');
		}

      create_menu_from_source(clicked_obj);
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
    body.removeClass('view_options prevent_outs');

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
		var viewport = page.getViewport(scale_required, image_rotation);
		

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

	var reload_times = 0;
	var z_plan = '';
	$("#acceptUploadZoningPlan").on('click', function() {
		upload_pdf();
	});

	function upload_pdf(){
		
		spinner.addClass('active');
		
		api.wellorder_reference(
			wor,
			function(o) {
				z_plan = o.zoning_plan;
				
				if(z_plan !== ''){
					showPDF(z_plan);
				} else if(reload_times <= 4){
					reload_times++;
					setTimeout(function(){upload_pdf();}, 3000);
					spinner.removeClass('active');
				} else {
					reload_times = 0;
					spinner.removeClass('active');
				}
				
			}, function(o) {
				console.log('Failure');
				spinner.removeClass('active');
			}
		);
		
	}
	
	
	$(document).on('click', '.rot_pdf_left, .rot_pdf_right', function(e) {
		e.preventDefault();
		var clicked = $(this);
    
		if(z_plan !== ''){		
				
			if(clicked.is('.rot_pdf_left')){
			  image_rotation = image_rotation - 90;
			} else if(clicked.is('.rot_pdf_right')){ 
			  image_rotation = image_rotation + 90;
			}
			
			showPDF(z_plan);
		
		} else {
			alert('Aluekaava puuttuu!');
		}
		
	});
	

  $(document).on('click', '.tag', function(e) {
    e.preventDefault();

    var new_obj = $(this);
    
		if(new_obj.hasClass('active')){
			$('.tag').removeClass('active');
			body.removeClass('message').attr('data-message', '');
		} else {
			$('.tag').removeClass('active');
			new_obj.addClass('active');
			var new_msg = new_obj.attr('data-warning_msg');
			if(new_msg){
				body.addClass('message').attr('data-message', new_msg);
			}
			
		}

  });


  var obj_id = 0;

	$(document).on('contextmenu', '#map_wrap', function(e){
    
    var new_obj = $('.tag.active');

      var posX = map.offset().left, posY = map.offset().top;

      remember_top = (e.pageY - posY)/zoomer;
      remember_left = (e.pageX - posX)/zoomer;
    
	var pin_offset = 13;
	
	if(new_obj.hasClass('outsider_marker')){
		pin_offset = 9;
	}
  var map_tp = (remember_top-pin_offset)/(middle_point.position().top*2/zoomer)*100,
      map_lp = (remember_left-pin_offset)/(middle_point.position().left*2/zoomer)*100;

      obj_id++;
	
	var dummy_id = 'x'+obj_id;


  if(new_obj.length > 0 && !new_obj.hasClass('obj_eraser') && !new_obj.hasClass('outsider_marker')){

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
        cloned_card_html.removeClass('active').attr('data-id_full', cloned_card_type+'-y'+dummy_id).attr('data-id', 'y'+dummy_id).attr('data-inlet_data', '').attr('data-target', '').attr('data-outlet_data', '').css({'top': map_tp+'%', 'left': map_lp+'%', 'transform': 'scale('+scale_factor/zoomer+','+scale_factor/zoomer+')'});
        cloned_card_html.find('.outlet_out').text('');
        cloned_card_html.find('.outlet_in').text('');
		cloned_card_html.find('.extra_outlet').remove();
      }

      $('#objects_wrap').append(cloned_card_html);

      recalc();
      
    } else {
    
    var new_obj_identifier = new_obj.attr('data-identifier'),
        new_obj_type = new_obj.attr('data-type').toUpperCase(),
        new_obj_title = new_obj.text(),
        already_found = $('.object[data-id_full="'+new_obj_type+'-'+dummy_id+'"]'),
        new_class = new_obj_type+'-'+dummy_id,
        new_id = dummy_id;
          
    if(already_found.length){
        new_class = new_obj_type+'-'+dummy_id+'_'+dummy_id;
        new_id = dummy_id+'_'+dummy_id;
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
                        ' data-mapy="'+map_tp+'"'+
                        ' data-mapx="'+map_lp+'"';
    

    var new_card =  '<span '+new_card_info+' class="object fresh_card" style="top:'+map_tp+'%;left:'+map_lp+'%;transform: scale('+scale_factor/zoomer+','+scale_factor/zoomer+')">'+
                    '<span class="outlet_out"></span>'+
                    '<span class="outlet_in"></span>'+
                    '<span class="outlet_wrap center"></span>'+
                    '<span class="inlet_wrap"></span>'+
                    '<span class="addons"></span>'+
                    '<a href="#" class="connect"><span class="connect_txt">Yhdistä</span><span class="disconnect_txt">Nollaa pääpoistot</span></a>'+
                    '</span>';

        $('#objects_wrap').append(new_card);

        recalc();
  
        } 
      } else {

		if(new_obj.hasClass('outsider_marker')){
			
			var option_parent = new_obj.parents('.outsider_object');
			option_parent.attr('data-pos_x', map_lp).attr('data-pos_y', map_tp);


			menu_to_source($('.object.active'));
			
			recalc();
			setTimeout(function(){recalc();}, 500);
			
        } else if(new_obj.hasClass('obj_eraser')){
            body.addClass('message').attr('data-message', 'Valitse ensin objekti jonka haluat poistaa!');
        } else {
            body.addClass('message').attr('data-message', 'Valitse ensin objekti jonka haluat lisätä!');  
        }
        
        setTimeout(function(){
          body.removeClass('message').attr('data-message', '');
        }, 2000);
        
      }

    return false;

	});


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
        card_outlet_data = card.find('.outlet_out').text(),
        card_inlet_data = card.find('.outlet_in').text(),
        card_target = card.attr('data-target');

  
    if (card_outlet_data.length > 0) {
        card_outlet_data = JSON.parse(card_outlet_data);
    }
    
    if (card_inlet_data.length > 0) {
        card_inlet_data = JSON.parse(card_inlet_data);
    }
  
  if(card.hasClass('ghost')){card_type = 'ghost'}
  
  var target_array = card_target.split(",");

  var create_card = $('<div class="object_card_wrap" data-card_type="'+card_type+'" data-card_id="'+card_id_full+'">'+
                '<div class="card_title">'+card_title+'</div>'+ 
                '<a href="#" data-warning_msg="Huom. Olet kopioimassa nykyistä korttia!" class="tag">Valitse kortti kopioitavaksi</a>'+
                '<div class="details">'+
                '<div class="detail_1"><div class="details_title">kaivonumero/id:</div><input data-source="'+card_id_full+'" data-card_type="'+card_type+'" class="details_id" type="text" name="kid" autocomplete="off" value="'+card_id+'"><br><span>(Kirjoita vain numero, kaivotyyppi tulee automaattisesti)</span></div>'+
                '<div class="detail_4"><div class="details_title">&#8593; maanpinta:</div><input class="details_upper_m" type="number" name="upper" step="0.1" autocomplete="off" value="'+card_top_pin+'"></div>'+
                '<div class="detail_5"><div class="details_title">&#8595; v.juoksu:</div><input class="details_lower_m" type="number" name="lower" step="0.1" autocomplete="off" value="'+card_bottom_pin+'"></div>'+
                      
                '<div class="detail_6"><div class="details_title">sakkapesä:</div><input class="details_chamber" type="number" name="chamber" step="0.1" min="0" autocomplete="off" value="'+card_chamber+'"><span>m</span></div>'+

                '<div class="inlet_outlet_placeholder"></div>'+

                '<div class="multi_selector_wrap"></div>'+

				'<div class="outsider_wrap">'+
					'<div class="outsider_inlets">'+
						'<div class="details_title">Ulkopuoliset yhteet:</div>'+

						'<div class="outsider_object outsider_out" data-index="0" data-type="5" data-pos_x="0" data-pos_y="0">'+
							'<div class="details_title">Poisto:</div>'+
							'<div class="option_wrap">'+
								'<select class="outsider_object_select" name="outsider_object_select1">'+
									'<option selected value="0">ei mitään</option>'+

								'</select>'+
								
								'<div><div class="details_title">V.juoksusta: </div><input type="number" min="0" class="outsider_object_height" name="outsider_object_height1" value="0" disabled><span>cm</span></div>'+
							'</div>'+
							'<a class="tag outsider_marker" data-warning_msg="Klikkaa kartalta ulkopuolisen yhteen kohde!" href="#">Merkitse ulkopuolisen yhteen kohde</a>'+
						'</div>'+

						'<div class="outsider_object outsider_inlet1" data-index="1" data-type="4" data-pos_x="0" data-pos_y="0">'+
							'<div class="details_title">Tulo 1:</div>'+
							'<div class="option_wrap">'+
								'<select class="outsider_object_select" name="outsider_object_select2">'+
									'<option selected value="0">ei mitään</option>'+

								'</select>'+
								
								'<div><div class="details_title">V.juoksusta: </div><input type="number" min="0" class="outsider_object_height" name="outsider_object_height2" value="0"><span>cm</span></div>'+
							'</div>'+
							'<a class="tag outsider_marker" data-warning_msg="Klikkaa kartalta ulkopuolisen yhteen kohde!" href="#">Merkitse ulkopuolisen yhteen kohde</a>'+
						'</div>'+

						'<div class="outsider_object outsider_inlet2" data-index="2" data-type="4" data-pos_x="0" data-pos_y="0">'+
							'<div class="details_title">Tulo 2:</div>'+
							'<div class="option_wrap">'+
								'<select class="outsider_object_select" name="outsider_object_select3">'+
									'<option selected value="0">ei mitään</option>'+

								'</select>'+
								
								'<div><div class="details_title">V.juoksusta: </div><input type="number" min="0" class="outsider_object_height" name="outsider_object_height3" value="0"><span>cm</span></div>'+
							'</div>'+
							'<a class="tag outsider_marker" data-warning_msg="Klikkaa kartalta ulkopuolisen yhteen kohde!" href="#">Merkitse ulkopuolisen yhteen kohde</a>'+
						'</div>'+

						'<div class="outsider_object outsider_inlet3" data-index="3" data-type="4" data-pos_x="0" data-pos_y="0">'+
							'<div class="details_title">Tulo 3:</div>'+
							'<div class="option_wrap">'+
								'<select class="outsider_object_select" name="outsider_object_select4">'+
									'<option selected value="0">ei mitään</option>'+

								'</select>'+
								
								'<div><div class="details_title">V.juoksusta: </div><input type="number" min="0" class="outsider_object_height" name="outsider_object_height4" value="0"><span>cm</span></div>'+
							'</div>'+
							'<a class="tag outsider_marker" data-warning_msg="Klikkaa kartalta ulkopuolisen yhteen kohde!" href="#">Merkitse ulkopuolisen yhteen kohde</a>'+
						'</div>'+

					'</div>'+
				'</div>'+
				
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
  
  var available_outlets = helper.category_and_children(helper.find_category_by_path(['yhde', 'poisto'])), outlets = '', outsider_inlets = '', outsider_inlets_other = '';
  var available_outlets_extra = helper.category_and_children(helper.find_category_by_path(['yhde', 'tulo']));
  var available_outlets_extra_other = helper.category_and_children(helper.find_category_by_path(['yhde', 'tulo_tai_poisto']));
  
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
			outlets_extra_json_other = helper.filter_ingredients_by_categories(o, available_outlets_extra_other);
            
            
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
				outlets += '<option class="primary" value="'+outlets_json[i].code+'" data-necessity="'+outlets_json[i].necessity+'" data-outlet_diameter="'+outlets_json[i].diameter+'" data-outlet_amount="'+outlets_json[i].amount+'" data-outlet_unit="'+outlets_json[i].unit+'">'+outlets_json[i].name.toUpperCase()+'</option>';
			});
            
			$.each(outlets_extra_json, function(i, item) {
				outsider_inlets += '<option value="'+outlets_extra_json[i].code+'" data-necessity="'+outlets_extra_json[i].necessity+'" data-outlet_diameter="'+outlets_extra_json[i].diameter+'" data-outlet_amount="'+outlets_extra_json[i].amount+'" data-outlet_unit="'+outlets_extra_json[i].unit+'">'+outlets_extra_json[i].name.toUpperCase()+'</option>';
			});
			
			$.each(outlets_extra_json_other, function(i, item) {
				outsider_inlets_other += '<option value="'+outlets_extra_json_other[i].code+'" data-necessity="'+outlets_extra_json_other[i].necessity+'" data-outlet_diameter="'+outlets_extra_json_other[i].diameter+'" data-outlet_amount="'+outlets_extra_json_other[i].amount+'" data-outlet_unit="'+outlets_extra_json_other[i].unit+'">'+outlets_extra_json_other[i].name.toUpperCase()+'</option>';
			});
			
			outsider_inlets += outsider_inlets_other;
			outlets += outsider_inlets_other;
	
		if(sakka_opt.length > 0){options.find('.multi_selector_wrap').append('<div class="checkbox_wrap"><div class="details_title"><span>Sakkapesä:</span></div>'+sakka_opt+'</div>');}
		if(teleskooppi_opt.length > 0){options.find('.multi_selector_wrap').append('<div class="checkbox_wrap"><div class="details_title"><span>Teleskooppi:</span></div>'+teleskooppi_opt+'</div>');}
		if(kansi_opt.length > 0){options.find('.multi_selector_wrap').append('<div class="checkbox_wrap"><div class="details_title"><span>Kansi/yläosa:</span></div>'+kansi_opt+'</div>');} 
		if(runkoputki_opt.length > 0){options.find('.multi_selector_wrap').append('<div class="radio_wrap"><div class="details_title"><span>Runko/nousuputki:</span></div>'+runkoputki_opt+'</div>');} 
		if(rungon_osat_opt.length > 0){options.find('.multi_selector_wrap').append('<div class="checkbox_wrap"><div class="details_title"><span>Rungon osat:</span></div>'+rungon_osat_opt+'</div>');} 
		if(venttiili_opt.length > 0){options.find('.multi_selector_wrap').append('<div class="checkbox_wrap"><div class="details_title"><span>Vesilukko:</span></div>'+venttiili_opt+'</div>');}
		if(pohja_opt.length > 0){options.find('.multi_selector_wrap').append('<div class="checkbox_wrap"><div class="details_title"><span>Pohja:</span></div>'+pohja_opt+'</div>');}
		if(lisavaruste_opt.length > 0){options.find('.multi_selector_wrap').append('<div class="checkbox_wrap"><div class="details_title"><span>Lisävarusteet:</span></div>'+lisavaruste_opt+'</div>');}

		if(card_type == 'JVTK' || card_type == 'TP'){options.find('.detail_6').hide();}


		options.find('.outsider_out .outsider_object_select').append(outlets);
		options.find('.outsider_inlet1 .outsider_object_select').append(outsider_inlets);
		options.find('.outsider_inlet2 .outsider_object_select').append(outsider_inlets);
		options.find('.outsider_inlet3 .outsider_object_select').append(outsider_inlets);

// if new card, use default values
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
							'<div class="details_title">Poiston tyyppi:</div>'+
							'<select class="details_outlet" name="outlet">'+
							'<option selected disabled hidden value="ei valittu" data-outlet_diameter="ei valittu" data-outlet_amount="ei valittu" data-outlet_unit="ei valittu">ei valittu</option>'+
							outlets+
							'</select>'+
							'<div class="details_outlet_len_wrap"><div class="details_title">Pituus/määrä:</div><input class="details_outlet_len" type="number" name="outlet_len" min="0" autocomplete="off" value="1" disabled><span class="outlet_unit">kpl</span></div>'+
						  
							'<div><div class="details_title">V.juoksusta:</div><input class="details_out_height" type="number" name="oheight" min="0" value="0" disabled><span>cm</span></div>'+
							checkpoint+
						'</div>');

			if (i >= 1) {
				outlet_option.find('.details_outlet option.primary').remove();
				outlet_option.find('.details_out_height').removeAttr('disabled');
			}
		
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

		});
		
		options.find('.outsider_out').remove();
		
	}

	card.find('.addons div').each(function() {
		var addon = $(this),
		addon_id = addon.attr('data-id');
		
		if(addon.hasClass('extra_outlet')){
			var extra_outlet_index = addon.attr('data-index'),
				extra_outlet_code = addon.attr('data-code'),
				extra_outlet_height = addon.attr('data-height'),
				extra_outlet_pos_y = addon.attr('data-pos_y'),
				extra_outlet_pos_x = addon.attr('data-pos_x');
	
			var extra_select = options.find('.outsider_object[data-index="'+extra_outlet_index+'"]');

			extra_select.attr('data-pos_y', extra_outlet_pos_y).attr('data-pos_x', extra_outlet_pos_x)
			
			extra_select.find('.outsider_object_height').val(extra_outlet_height);
			
			extra_select.find('.outsider_object_select option').removeAttr('selected');
			extra_select.find('.outsider_object_select option[value="'+extra_outlet_code+'"]').attr('selected','selected').prop('selected',true);
		} else {
			options.find('[data-id="'+addon_id+'"]').prop('checked',true);
		}
	});
	

		card.find('.inlet_wrap div').each(function() {
			var inpipe = $(this);
			var total_inlets_data = $('<div class="total_inlets_data">'+      
									'<div class="details_title">Tulo, '+inpipe.attr('data-inang')+'&deg;</div>'+
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
  
  
	var available_inlets = helper.category_and_children(helper.find_category_by_path(['yhde', 'tulo']));
	var available_inlets_other = helper.category_and_children(helper.find_category_by_path(['yhde', 'tulo_tai_poisto']));
  
  if (card_target.length > 0) {
      
  $.each(target_array,function(i){

    var target_card_identifier = $('.object[data-id_full="'+target_array[i]+'"]').attr('data-identifier'), inlets = ''
    
		api.wellingredients(
			target_card_identifier,
			function(o) {
				var inlets_json = helper.filter_ingredients_by_categories(o, available_inlets);
				var inlets_json_other = helper.filter_ingredients_by_categories(o, available_inlets_other);

				$.each(inlets_json, function(i, item) {
					inlets += '<option value="'+inlets_json[i].code+'" data-necessity="'+inlets_json[i].necessity+'" data-outlet_diameter="'+inlets_json[i].diameter+'" data-outlet_amount="'+inlets_json[i].amount+'" data-outlet_unit="'+inlets_json[i].unit+'">'+inlets_json[i].name.toUpperCase()+'</option>';
				});
				
				$.each(inlets_json_other, function(i, item) {
					inlets += '<option value="'+inlets_json_other[i].code+'" data-necessity="'+inlets_json_other[i].necessity+'" data-outlet_diameter="'+inlets_json_other[i].diameter+'" data-outlet_amount="'+inlets_json_other[i].amount+'" data-outlet_unit="'+inlets_json_other[i].unit+'">'+inlets_json_other[i].name.toUpperCase()+'</option>';
				});

				var inlet_option = $('<div class="inlets_options" data-ownid="'+card_id_full+'" data-target="'+target_array[i]+'">'+
								'<div class="details_title">Tulon tyyppi:</div>'+
								'<select class="details_inlets" name="inlets">'+
								'<option selected disabled hidden value="ei valittu" data-outlet_diameter="ei valittu" data-outlet_amount="ei valittu" data-outlet_unit="ei valittu">ei valittu</option>'+
								inlets+
								'</select>'+
								'<div class="details_inlets_len_wrap"><div class="details_title">Pituus/määrä:</div><input class="details_inlets_len" type="number" min="0" name="inlets_len" autocomplete="off" value="1" disabled><span class="inlets_unit">kpl</span></div>'+      
								'<div><div class="details_title">V.juoksusta:</div><input class="details_out_height" type="number" min="0" name="oheight" value="1"><span>cm</span></div>'+  
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
 
				setTimeout(function(){
					options.find('.outlet_options[data-target="'+target_array[i]+'"]').after(inlet_option);
					spinner.removeClass('active');
				}, 500);
 
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

});


function removeValue(list, value) {

	if(list !== undefined){

	return list.replace(new RegExp(",?" + value + ",?"), function(match) {
		var first_comma = match.charAt(0) === ',',
			second_comma;

		if (first_comma &&
			  (second_comma = match.charAt(match.length - 1) === ',')) {
		return ',';
		}
		return '';
	});
	
	}
};

  function reset_connection(old_id, new_id) {

	$('.object[data-target*="'+old_id+'"]').each(function() {
		var current_source = $(this),
			target_list = current_source.attr('data-target'),
			new_list = target_list.replace(old_id, new_id);
		
		current_source.attr('data-target', new_list);
	});
	  
//turn to array first
	$('.outlet_out').each(function() {
		var outlet_out_list = $(this).text(),
			find = old_id,
			regex = new RegExp(find, "g");

			new_outlet_out_list = outlet_out_list.replace(regex, new_id);
			
		$(this).text(new_outlet_out_list);
	});
	  
	$('.outlet_in').each(function() {
		var outlet_in_list = $(this).text(),
			find = old_id,
			regex = new RegExp(find, "g");
		
			new_outlet_in_list = outlet_in_list.replace(regex, new_id);
			
		$(this).text(new_outlet_in_list);
	});
	  
	$('.inlet_wrap').each(function() {
		$(this).find('div[data-coming_from="'+old_id+'"]').attr('data-coming_from', new_id);
	});
	  
	$('.outlet_wrap').each(function() {
		$(this).find('div[data-target="'+old_id+'"]').attr('data-target', new_id);
	});


    $('.object').each(function() {
		var currently_checking = $(this);
		
		var target_list = currently_checking.attr('data-target');
		var target_array = target_list.split(",");
    
		if(target_list !== undefined){
			$.each(target_array,function(i){
				var target_found = $('.object[data-id_full="'+target_array[i]+'"]').length;
				if(target_found == 0){
					var new_list = removeValue(target_list, target_array[i]);
					currently_checking.attr('data-target', new_list);
				}
			});
		}
    });
    
  }


  $(document).on('click input change', '.details input, .details select', function () {
    var cur_obj = $('.object.active');
    
    if($(this).is('.details_id')){
      
      var field = $(this),
      field_card_type = field.attr('data-card_type'),
      field_value = field.val(),
	  new_id = field_card_type+'-'+field_value;

		var dubs = $('.object[data-id_full="'+new_id+'"]').length;

		if(dubs >= 2 || field_value == '') {

			body.addClass('message dublicate_id').attr('data-message', 'Useammalla kuin yhdellä kaivolla on sama ID!');
			
		} else {

			var old_id = field.attr('data-source');
			
			options.find('[data-ownid]').attr('data-ownid', new_id);
			field.attr('data-source', new_id);
			body.removeClass('message dublicate_id').attr('data-message', '');

		menu_to_source(cur_obj);
		reset_connection(old_id, new_id);
		menu_to_source(cur_obj);

		}

    } else {
		menu_to_source(cur_obj);
    }

	setTimeout(function(){recalc();}, 1500);
	
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
			current_outlet_zip = current_outlet.find('.details_out_height').val(),
			current_outlet_target = current_outlet.attr('data-target');

      
	if(current_outlet_selected.attr('data-outlet_unit').toUpperCase() == 'KPL'){
		current_outlet.find('.details_outlet_len').prop( "disabled", true );
		current_outlet.find('.details_outlet_len_wrap .outlet_unit').text('kpl');
	} else if(current_outlet_selected.attr('data-outlet_unit').toUpperCase() == 'M'){
		current_outlet.find('.details_outlet_len').prop( "disabled", false );
		current_outlet.find('.details_outlet_len_wrap .outlet_unit').text('m');
	}
      
      
	if(current_outlet_selected.prop("disabled") == false){current_outlet.find('.create_checkpoint').removeClass('inactive');}
      
	outlet_options_array.push('["'+current_outlet_identifier+'", "'+current_outlet_name+'", "'+current_outlet_unit+'", "'+current_outlet_amount+'", "'+current_outlet_target+'", "'+current_outlet_zip+'", "'+current_outlet_dia+'"]');
    
	});
    
    current.find('.outlet_out').text('['+outlet_options_array+']');

    var inlets_options_array = [];
  
    $('.inlets_options').each(function() {
		var current_inlet = $(this),
			current_inlet_selected = current_inlet.find('.details_inlets option:selected'),
			current_inlet_identifier = current_inlet.find('.details_inlets').val(),
			current_inlet_name = current_inlet.find('.details_inlets option:selected').text(),
			current_inlet_unit = current_inlet_selected.attr('data-outlet_unit'),
			current_inlet_dia = current_inlet_selected.attr('data-outlet_diameter'),
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
      
	inlets_options_array.push('["'+current_inlet_identifier+'", "'+current_inlet_name+'", "'+current_inlet_unit+'", "'+current_inlet_amount+'", "'+current_inlet_back+'", "'+current_inlet_zip+'", "'+current_inlet_dia+'"]');

    });
  
    current.find('.outlet_in').text('['+inlets_options_array+']');
  
    current.find('.addons').html('');

	$('.checkbox_wrap :checkbox:checked').each(function() {
		var current_checkbox = $(this),
			checkbox_code = current_checkbox.val(),
			checkbox_id = current_checkbox.attr('data-id');
			
			current.find('.addons').append('<div data-id="'+checkbox_id+'" data-code="'+checkbox_code+'"></div>');
    });
  
	$('.radio_wrap :checkbox:checked').each(function() {
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


	$('.outsider_object').each(function() {
		var inlet_wrap = $(this),
			inlet_type = inlet_wrap.attr('data-type'),
			inlet_index = inlet_wrap.attr('data-index'),
			inlet_wrap_pos_t = inlet_wrap.attr('data-pos_x'),
			inlet_wrap_pos_l = inlet_wrap.attr('data-pos_y'),
			inlet_height = inlet_wrap.find('.outsider_object_height').val(),
			inlet_select = inlet_wrap.find('.outsider_object_select'),
			inlet_selected = inlet_select.find('option:selected'),
			inlet_selected_val = inlet_selected.val();

		if(inlet_selected_val !== '0' && inlet_wrap_pos_t !== '0' && inlet_wrap_pos_l !== '0'){

			var xtra_dia = inlet_selected.attr('data-outlet_diameter'),
				xtra_amount = inlet_selected.attr('data-outlet_amount'),
				xtra_unit = inlet_selected.attr('data-outlet_unit'),
				xtra_title = inlet_selected.text();
				
			var extra_obj = '<div class="extra_outlet" data-index="'+inlet_index+'" data-type="'+inlet_type+'" data-title="'+xtra_title+'" data-pos_y="'+inlet_wrap_pos_l+'" data-pos_x="'+inlet_wrap_pos_t+'" data-code="'+inlet_selected_val+'" data-amount="'+xtra_amount+'" data-height="'+inlet_height+'" data-angle="0" data-drop="0"></div>';

			current.find('.addons').append(extra_obj);
		}

	});
	
	if($('#options').find('.extra_outlet').length !== 0){
		current.find('.addons').append($('#options').find('.extra_outlet')[0].outerHTML);
	}
	
	recalc();
	setTimeout(function(){recalc();}, 500);
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
  var fail = false;

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
	
    if(obj.find('.outlet_wrap div').length == 0 && obj.find('.inlet_wrap div').length == 0 && obj.find('.extra_outlet').length == 0){
        fail = true;
		alert('kaivossa '+obj_id_full+' ei ole tuloja eikä poistoja! Lähetys estetty.');
	}

    if(obj_order_id == '-'){
        obj_order_id = '';
    }
    
    var card_code = [];
    var card_ingredients_json = [];
    
    //poisto
        obj.find('.middle').each(function(index) {

            var current_outpipe = $(this),
                outpipe_code = current_outpipe.attr('data-outlet_id'),
                outpipe_amount = current_outpipe.attr('data-amount'),
                outpipe_target = current_outpipe.attr('data-target'),
                outpipe_height = 0,
                outpipe_angle = 0,
                outpipe_drop = 0,
                pipe_type = 1,
                checkpoint_data = [],
                final_destination = '';

            var current_target = $('.object[data-id_full="'+outpipe_target+'"]');

                if(current_target.hasClass('ghost')){

                    var sources = current_target.attr('data-sources');
                    var source_split = sources.split(',');
                    
                    $('.object[data-sources="'+sources+'"]').each(function() {
                        var ghost_obj = $(this),
                            go_mapx = parseFloat(ghost_obj.attr('data-mapx')).toFixed(4),
                            go_mapy = parseFloat(ghost_obj.attr('data-mapy')).toFixed(4);

                        var checkpoint = [go_mapx,go_mapy];
                        checkpoint_data.push(checkpoint);
                    });
                    
                    final_destination = source_split[1];

                } else {
                    checkpoint_data = ''; 
                }

            
            if(index > 0){
                
                var out_one = parseFloat(obj.find('.middle').first().attr('data-point_dir'));
                outpipe_angle = Math.abs(Math.round(parseFloat(current_outpipe.attr('data-point_dir'))) - out_one);
                outpipe_drop = parseFloat(current_outpipe.attr('data-drop')).toFixed(2);
                pipe_type = 2;
            }

            var link_details = encodeURIComponent(JSON.stringify({"linked_to": outpipe_target, "type": pipe_type, "checkpoints": checkpoint_data, "fd": final_destination})); 
            var card_ingredients = {'code': outpipe_code, 'amount': outpipe_amount, 'height': outpipe_height, 'angle': outpipe_angle, 'drop': outpipe_drop, 'link_details': link_details};
            
            card_ingredients_json.push(card_ingredients);
        });


        obj.find('.addons div').each(function() {
            var current_addon = $(this),
                addon_code = '';
                
				
			if(current_addon.hasClass('extra_outlet')){
				
				var e_code = current_addon.attr('data-code'),
					e_type = current_addon.attr('data-type'),
					e_index = current_addon.attr('data-index'),
					e_amount = current_addon.attr('data-amount'),
					e_height = current_addon.attr('data-height'),
					e_angle = current_addon.attr('data-angle'),
					e_drop = current_addon.attr('data-drop'),
					e_pos_y = current_addon.attr('data-pos_y'),
					e_pos_x = current_addon.attr('data-pos_x'),
					e_link_details = encodeURIComponent(JSON.stringify({"index": e_index, "type": e_type, "checkpoints": '['+e_pos_y+','+e_pos_x+']'})),
					e_id = '';
					
					if(current_addon.attr('data-id') !== undefined){
						e_id = current_addon.attr('data-id');
					}
			
					addon_code = {'code': e_code, 'amount': e_amount, 'height': e_height, 'angle': e_angle, 'drop': e_drop, 'id': e_id, 'link_details': e_link_details};
					
			} else {
				addon_code = JSON.parse(decodeURIComponent(current_addon.attr('data-code')));
			}
				
            card_ingredients_json.push(addon_code);
        });


    //tulot
        obj.find('.inlet_wrap div').each(function() {
          
            var current_inpipe = $(this),
                inpipe_code = current_inpipe.attr('data-inlet_id'),
                inpipe_amount = current_inpipe.attr('data-amount'),
                inpipe_height = current_inpipe.attr('data-zip'),
                inpipe_angle = current_inpipe.attr('data-inang'),
                inpipe_coming_from = current_inpipe.attr('data-coming_from'),
                inpipe_drop = parseFloat(current_inpipe.attr('data-drop')).toFixed(2),
                pipe_type = 3;
        
            var link_details = encodeURIComponent(JSON.stringify({"linked_to": inpipe_coming_from, "type": pipe_type})); 
            var card_ingredients = {'code': inpipe_code, 'amount': inpipe_amount, 'height': inpipe_height, 'angle': inpipe_angle, 'drop': inpipe_drop, 'link_details': link_details};
                
            card_ingredients_json.push(card_ingredients);
        });
    
      card_code = {'identifier': obj_id_full, 'pos_x': obj_mapx, 'pos_y': obj_mapy, 'id': obj_order_id, 'height_ground': obj_height_ground, 'height_water': obj_height_water, 'height_sp': obj_height_chamber, 'wellgroup': obj_wellgroup, 'wellingredients': card_ingredients_json};

      $('.well_order_link').remove();

      wells.push(card_code);

  });
  console.log(wells);
      if(fail == false){
        
		spinner.addClass('active');

		try {

			api.save_wells(
			  wells,
			  function(o) {
				spinner.removeClass('active');
				window.open(base_url+'/heavyuser_wellorders/'+wor);     
			}, function(o) {
				console.log('Failure');
			});

		}
		
		catch(err) {
			
			spinner.removeClass('active');
			alert('Yhteysvirhe, kokeile hetken päästä uudelleen.');
			
		}
        
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

	$(document).on('click', '#print_plan', function(e) {
		e.preventDefault();
		setTimeout(function(){window.print();}, 500);
	}); 
	
	$(document).on('click', '.warning', function(e) {
		e.preventDefault();
		$(this).removeClass('active');
	});

	var zoning_data;
	
    api.wellorder_reference(
        wor,
        function(o) {
            console.log(o);
			zoning_data = o.zoning_plan;
            if(o.wellorders.length > 0){load_inlet_list(o.wellorders);}
            if(zoning_data.length > 0){showPDF(zoning_data);}
        }, function(o) {
              console.log('Failure');
              console.log(o);
        }
    );
