// MAP CODE 
var markers = []; 
var gmarkers = []; 
var infowindow = new google.maps.InfoWindow({ 
    content: '' 
}); 
$('.map-marker-info').each(function () { 
    markerArr = []; 
    infoArr = []; 
    var title = $(this).data('marker-title'); 
    var lat = $(this).data('marker-latitude'); 
    var long = $(this).data('marker-longitude'); 
    var description = $(this).data('marker-description'); 
    var state = $(this).data('marker-state'); 
    var titleURLFriendly = title.replace(/\s+/g, '-').toLowerCase(); 
    markerArr.push(title); 
    markerArr.push(lat); 
    markerArr.push(long); 
    markerArr.push(state); 
    markerArr.push('<div class="info_content"><span class="map-marker-title">' + title + '</span> 
' + description + '</div>'); 
    if ($('body').hasClass('page-template-page-order-online') || $('body').hasClass('page-template-page-spots') || $('body').hasClass('home')) { 
        markers.push(markerArr); 
    } 
    if (window.location.href.indexOf(state.toLowerCase()) >= 0 && $('body').hasClass('page-template-page-location')) { 
        markers.push(markerArr); 
    } 
    if (window.location.href.indexOf(titleURLFriendly) >= 0 && $('body').hasClass('page-template-page-single-location')) { 
        markers.push(markerArr); 
    } 
}); 
function initialize() { 
    var bounds = new google.maps.LatLngBounds(); 
    var mapOptions = { 
        mapTypeId: google.maps.MapTypeId.ROADMAP 
    }; 
    map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions); 
    for (i = 0; i < markers.length; i++) { 
        addMarker(markers[i]); 
        bounds.extend(marker1.position); 
    } 
    map.fitBounds(bounds); 
} 
function addMarker(marker) { 
    var category = marker[3]; 
    var title = marker[0]; 
    var pos = new google.maps.LatLng(marker[1], marker[2]); 
    var content = marker[4]; 
    marker1 = new google.maps.Marker({ 
        title: title, 
        position: pos, 
        category: category, 
        icon: '/wp-content/themes/the-buffalo-spot-consumer/assets/images/map-marker.png', 
        map: map 
    }); 
    gmarkers.push(marker1); 
    // Marker click listener 
    google.maps.event.addListener(marker1, 'click', (function (marker1, content) { 
        return function () { 
            infowindow.setContent(content); 
            infowindow.open(map, marker1); 
            map.panTo(this.getPosition()); 
            map.setZoom(10); 
        } 
    })(marker1, content)); 
} 
initialize(); 
// MAP CODE END 
// Filter Map Pins 
$('.state').click(function () { 
    var text = $(this).text(); 
    filterCitys(text); 
    map.setZoom(5); 
    infowindow.close(); 
    $('.links').slideUp(); 
    $('.locations').removeClass('after-line'); 
    if ($('.state').hasClass('after-line')) { 
        $('.state').removeClass('after-line'); 
    } 
    $(this).addClass('after-line'); 
    for (i = 0; i < markers.length; i++) { 
        marker = gmarkers[i]; 
        if (marker.category == text) { 
            marker.setVisible(true); 
        } else { 
            marker.setVisible(false); 
        } 
    } 
    if ($(window).outerWidth() < 768) { 
        $('html, body').animate({ 
            scrollTop: $(".locs").offset().top - 100 
        }, 2000); 
    } 
}); 
$('.locations .city').click(function () { 
    var city = $(this).attr('data-city'); 
    var cls = $(this).attr('class'); 
    cls = cls.split(" "); 
    filterlinks(city); 
    map.setZoom(5); 
    infowindow.close(); 
    $('.links').slideDown(); 
    $(this).parent('.locations').addClass('after-line'); 
    for (i = 0; i < markers.length; i++) { 
        marker = gmarkers[i]; 
        if (marker.title.replace(/\s+/g, '-').toLowerCase() == city) { 
            marker.setVisible(true); 
        } else { 
            marker.setVisible(false); 
        } 
    } 
    $('html, body').animate({ 
        scrollTop: $(".links").offset().top - 150 
    }, 1000); 
}); 
function filterCitys(c) { 
    var locs, i; 
    locs = $('.locations .city'); 
    for (i = 0; i < locs.length; i++) { 
        if (locs[i].className.indexOf(c) > -1) { 
            $(locs[i]).slideDown(); 
        } else { 
            $(locs[i]).slideUp(); 
        } 
    } 
} 
function filterlinks(c) { 
    var locs, i; 
    locs = $('.links > .city'); 
    for (i = 0; i < locs.length; i++) { 
        var city = $(locs[i]).attr('data-city'); 
        if (city == c) { 
            $(locs[i]).slideDown(); 
        } else { 
            $(locs[i]).slideUp(); 
        } 
    } 
}