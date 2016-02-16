select way,highway from planet_osm_line 
where highway in ('motorway','motorway_link','trunk','trunk_link','primary','primary_link',
		'secondary','secondary_link','tertiary','tertiary_link','residential','unclassified') 
		and tunnel in ('yes','true','1') 
		order by z_order 

SELECT row_to_json(fc)
 FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
 FROM (SELECT 'Feature' As type
    , ST_AsGeoJSON(lg.way)::json As geometry
    , row_to_json(lp) As properties
   FROM planet_osm_line As lg 
         INNER JOIN (SELECT osm_id, name,highway FROM planet_osm_line where highway is not null) As lp 
       ON lg.osm_id = lp.osm_id  ) As f )  As fc;