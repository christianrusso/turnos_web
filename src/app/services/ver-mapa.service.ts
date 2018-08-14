import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
declare const google: any;

@Injectable()
export class VerMapService {
  constructor(private _http: Http) { }
  generateMap(locations,markerClick) {
  

    // Icons are located in this folder
      var iconURLPrefix = '/assets/img/';

      // Icons are named
      var icons = [
        iconURLPrefix + 'normal.png',
        iconURLPrefix + 'normal.png',
      ]
  
      // Map options
      var map = new google.maps.Map(document.getElementById('google-map'),
        {
          zoom: 16,
          center: new google.maps.LatLng(-34.5432596, 5.762930),
          mapTypeControl: false,
          streetViewControl: false,
          panControl: false,
          scrollwheel: false,
          navigationControl: false,
          scaleControl: false,
          zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
          }
        });
  
      var infowindow = new google.maps.InfoWindow({
        maxWidth: 300
      });
  
      var marker;
      var markers = new Array();
  
      var iconCounter = 0;
  
      // Add the markers and infowindows to the map
      for (var i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i][1], locations[i][2], locations[i][3], locations[i][4], locations[i][5]),
          map: map,
          icon: '/assets/img/normal.png'
        });

        markers.push(marker);
  
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
          return function () {
            infowindow.setContent(locations[i][0]);

            infowindow.open(map, marker);
            for (var j = 0; j < markers.length; j++) {
              markers[j].setIcon("/assets/img/normal.png");
            }
            marker.setIcon("/assets/img/special.png");
          }
  
        })(marker, i));
  
        iconCounter++;
  
      } function AutoCenter() {
        // Create a new viewpoint bound
        var bounds = new google.maps.LatLngBounds();
        // Go through each...
        $.each(markers, function (index, marker) {
          bounds.extend(marker.position);
        });
        // Fit these bounds to the map
        map.fitBounds(bounds);
        map.setZoom(16);

      }
      AutoCenter();
    
    

    if(markerClick!=null){
      google.maps.event.trigger(markers[markerClick], 'click');
    }
    
  }


}
