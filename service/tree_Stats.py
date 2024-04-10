import os
import json
from shoelaceAlgorithm import Shoelace_Algorithm
import numpy as np

class Tree_Stats():
    def __init__(self, results):
        # Parse the JSON string into a Python dictionary
        self.parsed_json = json.loads(results)
        self.THRESHHOLD = 0.12
        # ================ Average pixels as per benchmark
        # CLASS_AVERAGE = [WIDTH, HEIGHT, AREA, CONFIDENCE]
        self.CANOPY_AVERAGE = [379.77263, 305.7468654, 87278.17294, 0.9298857246]
        self.TRUNK_AVERAGE = [155.5456, 233.1408, 28985.6888, 0.8246728546]
        self.ROOT_AVERAGE = [214.7882353, 135.8705882, 14851.93824, 293.3823529, 0.8511597362]
        # ================ Feature Classification
        self.canopy_classification = ""
        self.trunk_classification = ""
        self.root_classification = ""

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
        measurements = {'canopy': 0, 'trunk': 0, 'root':0}
        width = {'canopy': [], 'trunk': [], 'root': []}
        height = {'canopy': [], 'trunk': [], 'root': []}
        confidence = {'canopy': [], 'trunk': [], 'root': []}
        num_coords = 0

        # If may na detect na class
        if num_classes > 0:
            # Loop to every class
            for ind in range(0, num_classes):
                # Saving the type of class
                type_of_class = self.parsed_json[ind]['name']


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

                if type_of_class == 'Canopy':
                    # Add the resulting area since it may have multiple same detected class
                    measurements['canopy'] += surface_area
                    # print(measurements['canopy'])
                    width['canopy'].append(surface_dimension[0])
                    height['canopy'].append(surface_dimension[1])
                    confidence['canopy'].append(detection_confidence)
                elif type_of_class == 'Trunk':
                    # Add the resulting area since it may have multiple same detected class
                    measurements['trunk'] += surface_area
                    width['trunk'].append(surface_dimension[0])
                    height['trunk'].append(surface_dimension[1])
                    confidence['trunk'].append(detection_confidence)
                elif type_of_class == 'Root':
                    # Add the resulting area since it may have multiple same detected class
                    measurements['root'] += surface_area
                    width['root'].append(surface_dimension[0])
                    height['root'].append(surface_dimension[1])
                    confidence['root'].append(detection_confidence)
                    num_coords = num_coords + len(self.parsed_json[ind]['segments']['x'])

        #======= Classifications
        # == Canopy = Small | Proportionate | Large
        # print(measurements['canopy'])
        canopy_area = np.mean(measurements['canopy'])
        if(canopy_area == 0):
            self.canopy_classification = 'Absent'
        elif(canopy_area < self.calculate_MinMax(self.CANOPY_AVERAGE[2], 'min')):
            self.canopy_classification = 'Small'
        elif(canopy_area > self.calculate_MinMax(self.CANOPY_AVERAGE[2], 'max')):
            self.canopy_classification = 'Large'
        else:
            self.canopy_classification = 'Proportionate'

        # == Trunk = Thin | Normal | Wide
        trunk_area = np.mean(measurements['trunk'])
        if(trunk_area == 0):
            self.trunk_classification = 'Absent'
        elif(trunk_area < self.calculate_MinMax(self.TRUNK_AVERAGE[0], 'min')):
            self.trunk_classification = 'Thin'
        elif(trunk_area > self.calculate_MinMax(self.TRUNK_AVERAGE[0], 'max')):
            self.trunk_classification = 'Wide'
        else:
            self.trunk_classification = 'Normal'

        # == Root = Many Root | Lack of Roots | Present | Absent
        root_area = np.mean(measurements['root'])
        if(num_coords == 0):
            self.root_classification = 'Absent'
        elif(num_coords < self.calculate_MinMax(self.ROOT_AVERAGE[3], 'min')):
            self.root_classification = 'Lack of Roots'
        elif(num_coords > self.calculate_MinMax(self.ROOT_AVERAGE[3], 'max')):
            self.root_classification = 'Many Root'
        else:
            self.root_classification = 'Present'

        res = [
            {
                'class' : 'Canopy',
                'confidence': np.mean(confidence['canopy']),
                'classification': self.canopy_classification,
                'area': canopy_area,
                'width': np.mean(width['canopy']),
                'height': np.mean(height['canopy']),
            },
            {
                'class' : 'Trunk',
                'confidence': np.mean(confidence['trunk']),
                'classification': self.trunk_classification,
                'area': trunk_area,
                'width': np.mean(width['trunk']),
                'height': np.mean(height['trunk']),
            },
            {
                'class' : 'Root',
                'confidence': np.mean(confidence['root']),
                'classification': self.root_classification,
                'area': root_area,
                'num_coord': num_coords,
                'width': np.mean(width['root']),
                'height': np.mean(height['root']),
            }
        ]
        
        return res