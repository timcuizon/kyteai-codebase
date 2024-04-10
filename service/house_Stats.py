import os
import json
from shoelaceAlgorithm import Shoelace_Algorithm
import numpy as np

class House_Stats():
    def __init__(self, results):
        # Parse the JSON string into a Python dictionary
        self.parsed_json = json.loads(results)
        self.THRESHHOLD = 0.12
        # ================ Average pixels as per benchmark
        # CLASS_AVERAGE = [WIDTH, HEIGHT, AREA, CONFIDENCE]
        self.DOOR_AVERAGE = [80.79086083, 132.7959803, 11116.19909, 0.8919671411]
        self.ROOF_AVERAGE = [333.0601894, 181.1668194, 36311.97159, 0.9182234062]
        self.WALL_AVERAGE = [313.9797891, 308.6775044, 83220.61072, 0.9198411387]
        self.WINDOW_AVERAGE = [73.23071923, 81.49579604, 15637.298, 0.8760414138]
        self.CHIMNEY_AVERAGE = [57.43119266, 89.61582569, 4080.065367, 0.8673231025]
        # ================ Feature Classification
        self.door_classification = ""
        self.roof_classification = ""
        self.wall_classification = ""
        self.window_classification = ""
        self.chimney_classification = ""

    def calculate_MinMax(self, v, t):
        if (t == 'min'):
            val = v - (v * self.THRESHHOLD)
        elif (t == 'max'):
            val = v + (v * self.THRESHHOLD)
        return val
    
    def Stats(self):
        num_classes = len(self.parsed_json)
        res = []
        # Preparing for the class' total surface area
        measurements = {'door': 0, 'roof': 0, 'wall':0, 'window':0, 'chimney':0}
        width = {'door': [], 'roof': [], 'wall':[], 'window':[], 'chimney':[]}
        height = {'door': [], 'roof': [], 'wall':[], 'window':[], 'chimney':[]}
        confidence = {'door': [], 'roof': [], 'wall':[], 'window':[], 'chimney':[]}
        
        # If may na detect na class
        if num_classes > 0:
            # Loop to every class
            for ind in range(0, num_classes):
                # Saving the type of class
                type_of_class = self.parsed_json[ind]['name']
                # print(type_of_class)

                #============== Getting the confidence level of the detected class
                detection_confidence = self.parsed_json[ind]['confidence']
                # print(detection_confidence)

                #============== Generating an array of vertices. Preparation before shoelace algorithm
                # Getting the x and y axis as [(x1,y1), (x2,y2)] that serves as vertices
                vertices = list(zip(self.parsed_json[ind]['segments']['x'], self.parsed_json[ind]['segments']['y']))
                # print(vertices)

                #============= Execute Shoelace algorithm
                # instantiating the shoelace algo model
                shoelace_algorithm = Shoelace_Algorithm(vertices)

                #============= Saving the surface area result. This can be done to total the surface area of same multiple detected features (i.e. two roots were detected)
                surface_area = shoelace_algorithm.calculate_polygon_surface_area()
                surface_dimension = shoelace_algorithm.calculate_polygon_width_height()

                if type_of_class == 'Door':
                    # Add the resulting area since it may have multiple same detected class
                    measurements['door'] += surface_area
                    width['door'].append(surface_dimension[0])
                    height['door'].append(surface_dimension[1])
                    confidence['door'].append(detection_confidence)
                elif type_of_class == 'Wall':
                    # Add the resulting area since it may have multiple same detected class
                    measurements['wall'] += surface_area
                    width['wall'].append(surface_dimension[0])
                    height['wall'].append(surface_dimension[1])
                    confidence['wall'].append(detection_confidence)
                elif type_of_class == 'Roof':
                    # Add the resulting area since it may have multiple same detected class
                    measurements['roof'] += surface_area
                    width['roof'].append(surface_dimension[0])
                    height['roof'].append(surface_dimension[1])
                    confidence['roof'].append(detection_confidence)
                elif type_of_class == 'Window':
                    # Add the resulting area since it may have multiple same detected class
                    measurements['window'] += surface_area
                    width['window'].append(surface_dimension[0])
                    height['window'].append(surface_dimension[1])
                    confidence['window'].append(detection_confidence)
                elif type_of_class == 'Chimney':
                    # Add the resulting area since it may have multiple same detected class
                    measurements['chimney'] += surface_area
                    width['chimney'].append(surface_dimension[0])
                    height['chimney'].append(surface_dimension[1])
                    confidence['chimney'].append(detection_confidence)
        
        #======= Classifications
        # == Door = present | small | large
        door_area = np.mean(measurements['door'])
        if(door_area == 0):
            self.door_classification = 'Absent'
        elif(door_area < self.calculate_MinMax(self.DOOR_AVERAGE[2], 'min')):
            self.door_classification = 'Small'
        elif(door_area > self.calculate_MinMax(self.DOOR_AVERAGE[2], 'max')):
            self.door_classification = 'Large'

        # Roof = present | absent | large
        roof_area = np.mean(measurements['roof'])
        if(roof_area == 0):
            self.roof_classification = 'Absent'
        elif(roof_area > self.calculate_MinMax(self.ROOF_AVERAGE[2], 'max')):
            self.roof_classification = 'Large'
        elif(roof_area <= self.calculate_MinMax(self.ROOF_AVERAGE[2], 'max')):
            self.roof_classification = 'Normal'

        # Wall = present | absent | thick | thin
        wall_area = np.mean(measurements['wall'])
        if(wall_area == 0):
            self.wall_classification = 'Absent'
        elif(wall_area > self.calculate_MinMax(self.WALL_AVERAGE[0], 'max')):
            self.wall_classification = 'Thick'
        elif(wall_area < self.calculate_MinMax(self.WALL_AVERAGE[0], 'max')):
            self.wall_classification = 'Thin'
        else:
            self.wall_classification = 'Normal'

        # Window = present | absent
        window_area = np.mean(measurements['window'])
        if(window_area != 0):
            self.window_classification = 'Present'
        else:
            self.window_classification = 'Absent'

        # Chimney = present | absent
        chimney_area = np.mean(measurements['chimney'])
        if(chimney_area != 0):
            self.chimney_classification = 'Present'
        else:
            self.chimney_classification = 'Absent'


        res = [
            {
                'class' : 'Door',
                'confidence': np.mean(confidence['door']),
                'classification': self.door_classification,
                'area': door_area,
                'width': np.mean(width['door']),
                'height': np.mean(height['door']),
            },
            {
                'class' : 'Roof',
                'confidence': np.mean(confidence['roof']),
                'classification': self.roof_classification,
                'area': roof_area,
                'width': np.mean(width['roof']),
                'height': np.mean(height['roof']),
            },
            {
                'class' : 'Wall',
                'confidence': np.mean(confidence['wall']),
                'classification': self.wall_classification,
                'area': wall_area,
                'width': np.mean(width['wall']),
                'height': np.mean(height['wall']),
            },
            {
                'class' : 'Window',
                'confidence': np.mean(confidence['window']),
                'classification': self.window_classification,
                'area': window_area,
                'width': np.mean(width['window']),
                'height': np.mean(height['window']),
            },
            {
                'class' : 'Chimney',
                'confidence': np.mean(confidence['chimney']),
                'classification': self.chimney_classification,
                'area': np.mean(measurements['chimney']),
                'width': np.mean(width['chimney']),
                'height': np.mean(height['chimney']),
            }
        ]
        
        return res