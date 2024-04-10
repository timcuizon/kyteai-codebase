import os
import json
from shoelaceAlgorithm import Shoelace_Algorithm
import numpy as np

class Person_Stats():
    def __init__(self, results):
        # Parse the JSON string into a Python dictionary
        self.parsed_json = json.loads(results)
        self.THRESHHOLD = 0.12
        # ================ Average pixels as per benchmark
        # CLASS_AVERAGE = [WIDTH, HEIGHT, AREA, CONFIDENCE]
        self.HEAD_AVERAGE = [145.9930037, 109.1291978, 14683.71175, 0.8441308995]
        self.HAIR_AVERAGE = [156.7299771, 110.140923, 7869.540046, 0.8540577193]
        self.EYES_AVERAGE = [27.67085538, 19.62852734, 924.0780423, 0.7756856513]
        self.EAR_AVERAGE = [20.16568483, 25.43667158, 798.2842415, 0.7580172314]
        self.NOSE_AVERAGE = [32.26315789, 30.14035088, 797.0964912, 0.7777238488]
        self.MOUTH_AVERAGE = [44.94670051, 19.64382403, 551.323181, 0.7746468105]
        self.NECK_AVERAGE = [33.29545455, 30.71022727, 1043.988636, 0.780210323]
        self.ARMS_AVERAGE = [68.57919301, 86.05555556, 5868.988708, 0.8253325344]
        self.HANDS_AVERAGE = [38.50978565, 31.37433986, 1955.657502, 0.8216838577]
        self.LEGS_AVERAGE = [70.85576923, 111.5829327, 8912.876803, 0.8120656103]
        self.FEET_AVERAGE = [51.18393536, 31.29158745, 2694.451046, 0.8159335283]
        # ================ Feature Classification
        self.head_classification = ""
        self.hair_classification = ""
        self.eyes_classification = ""
        self.ear_classification = ""
        self.nose_classification = ""
        self.mouth_classification = ""
        self.neck_classification = ""
        self.arms_classification = ""
        self.hands_classification = ""
        self.legs_classification = ""
        self.feet_classification = ""

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
        measurements = {'head': 0, 'hair': 0, 'eyes':0, 'ear':0, 'nose':0, 'mouth':0, 'neck':0, 'arms':0, 'hands':0, 'legs':0, 'feet':0}
        width = {'head': [], 'hair': [], 'eyes':[], 'ear':[], 'nose':[], 'mouth':[], 'neck':[], 'arms':[], 'hands':[], 'legs':[], 'feet':[]}
        height = {'head': [], 'hair': [], 'eyes':[], 'ear':[], 'nose':[], 'mouth':[], 'neck':[], 'arms':[], 'hands':[], 'legs':[], 'feet':[]}
        confidence = {'head': [], 'hair': [], 'eyes':[], 'ear':[], 'nose':[], 'mouth':[], 'neck':[], 'arms':[], 'hands':[], 'legs':[], 'feet':[]}

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

                if type_of_class == 'Head':
                    # Add the resulting area since it may have multiple same detected class
                    measurements['head'] += surface_area
                    width['head'].append(surface_dimension[0])
                    height['head'].append(surface_dimension[1])
                    confidence['head'].append(detection_confidence)
                elif type_of_class == 'Hair':
                    # Add the resulting area since it may have multiple same detected class
                    measurements['hair'] += surface_area
                    width['hair'].append(surface_dimension[0])
                    height['hair'].append(surface_dimension[1])
                    confidence['hair'].append(detection_confidence)
                elif type_of_class == 'Eyes':
                    # Add the resulting area since it may have multiple same detected class
                    measurements['eyes'] += surface_area
                    width['eyes'].append(surface_dimension[0])
                    height['eyes'].append(surface_dimension[1])
                    confidence['eyes'].append(detection_confidence)
                elif type_of_class == 'Ear':
                    # Add the resulting area since it may have multiple same detected class
                    measurements['ear'] += surface_area
                    width['ear'].append(surface_dimension[0])
                    height['ear'].append(surface_dimension[1])
                    confidence['ear'].append(detection_confidence)
                elif type_of_class == 'Nose':
                    # Add the resulting area since it may have multiple same detected class
                    measurements['nose'] += surface_area
                    width['nose'].append(surface_dimension[0])
                    height['nose'].append(surface_dimension[1])
                    confidence['nose'].append(detection_confidence)
                elif type_of_class == 'Mouth':
                    # Add the resulting area since it may have multiple same detected class
                    measurements['mouth'] += surface_area
                    width['mouth'].append(surface_dimension[0])
                    height['mouth'].append(surface_dimension[1])
                    confidence['mouth'].append(detection_confidence)
                elif type_of_class == 'Neck':
                    # Add the resulting area since it may have multiple same detected class
                    measurements['neck'] += surface_area
                    width['neck'].append(surface_dimension[0])
                    height['neck'].append(surface_dimension[1])
                    confidence['neck'].append(detection_confidence)
                elif type_of_class == 'Arms':
                    # Add the resulting area since it may have multiple same detected class
                    measurements['arms'] += surface_area
                    width['arms'].append(surface_dimension[0])
                    height['arms'].append(surface_dimension[1])
                    confidence['arms'].append(detection_confidence)
                elif type_of_class == 'Hands':
                    # Add the resulting area since it may have multiple same detected class
                    measurements['hands'] += surface_area
                    width['hands'].append(surface_dimension[0])
                    height['hands'].append(surface_dimension[1])
                    confidence['hands'].append(detection_confidence)
                elif type_of_class == 'Legs':
                    # Add the resulting area since it may have multiple same detected class
                    measurements['legs'] += surface_area
                    width['legs'].append(surface_dimension[0])
                    height['legs'].append(surface_dimension[1])
                    confidence['legs'].append(detection_confidence)
                elif type_of_class == 'Feet':
                    # Add the resulting area since it may have multiple same detected class
                    measurements['feet'] += surface_area
                    width['feet'].append(surface_dimension[0])
                    height['feet'].append(surface_dimension[1])
                    confidence['feet'].append(detection_confidence)

        
        #======= Classifications
        # == Arms = Short/Thin | Absent
        arms_area = np.mean(measurements['arms'])
        if(arms_area == 0):
            self.arms_classification = 'Absent'
        elif(arms_area < self.calculate_MinMax(self.ARMS_AVERAGE[2], 'min')):
            self.arms_classification = 'Short/Thin'
        else:
            self.arms_classification = 'Normal'

        # Hands = present | Normal
        hands_area = np.mean(measurements['hands'])
        if(hands_area == 0):
            self.hands_classification = 'Absent'
        else:
            self.hands_classification = 'Normal'

        # Legs = Large | Normal
        legs_area = np.mean(measurements['legs'])
        if(legs_area == 0):
            self.legs_classification = 'Absent'
        elif(legs_area > self.calculate_MinMax(self.LEGS_AVERAGE[0], 'max')):
            self.legs_classification = 'Large'
        else:
            self.legs_classification = 'Normal'

        # Feet = Present | Absent
        feet_area = np.mean(measurements['feet'])
        if(feet_area != 0):
            self.feet_classification = 'Present'
        else:
            self.feet_classification = 'Absent'

        # Hair = Present | Absent
        hair_area = np.mean(measurements['hair'])
        if(hair_area != 0):
            self.hair_classification = 'Present'
        else:
            self.hair_classification = 'Absent'

        # Head = Large | Small | Normal | Absent
        head_area = np.mean(measurements['head'])
        if(head_area == 0):
            self.head_classification = 'Absent'
        elif(head_area > self.calculate_MinMax(self.HEAD_AVERAGE[2], 'max')):
            self.head_classification = 'Large'
        elif(head_area < self.calculate_MinMax(self.HEAD_AVERAGE[2], 'min')):
            self.head_classification = 'Small'
        else:
            self.head_classification = 'Normal'

        # Neck = Long | Thin | Normal | Absent
        neck_area = np.mean(measurements['neck'])
        if(neck_area == 0):
            self.neck_classification = 'Absent'
        elif(neck_area > self.calculate_MinMax(self.NECK_AVERAGE[1], 'max')):
            self.neck_classification = 'Long'
        elif(neck_area < self.calculate_MinMax(self.NECK_AVERAGE[0], 'min')):
            self.neck_classification = 'Thin'
        else:
            self.neck_classification = 'Normal'

        # Nose = Large | Normal | Absent
        nose_area = np.mean(measurements['nose'])
        if(nose_area == 0):
            self.nose_classification = 'Absent'
        elif(nose_area > self.calculate_MinMax(self.NOSE_AVERAGE[2], 'max')):
            self.nose_classification = 'Large'
        else:
            self.nose_classification = 'Normal'

        # ear = Large | Under emphasized | Absent | Normal
        ears_area = np.mean(measurements['ear'])
        if(ears_area == 0):
            self.ear_classification = 'Absent'
        elif(ears_area > self.calculate_MinMax(self.EAR_AVERAGE[2], 'max')):
            self.ear_classification = 'Large'
        elif(ears_area < self.calculate_MinMax(self.EAR_AVERAGE[2], 'min')):
            self.ear_classification = 'Under emphasized'
        else:
            self.ear_classification = 'Normal'

        # Eyes = Large | Under emphasized | Absent | Normal
        eyes_area = np.mean(measurements['eyes'])
        if(eyes_area == 0):
            self.eyes_classification = 'Absent'
        elif(eyes_area > self.calculate_MinMax(self.EYES_AVERAGE[2], 'max')):
            self.eyes_classification = 'Large'
        elif(eyes_area < self.calculate_MinMax(self.EYES_AVERAGE[2], 'min')):
            self.eyes_classification = 'Under emphasized'
        else:
            self.eyes_classification = 'Normal'

        # Mouth = Large | Under emphasized | Absent | Normal
        mouth_area = np.mean(measurements['mouth'])
        if(mouth_area == 0):
            self.mouth_classification = 'Absent'
        elif(mouth_area > self.calculate_MinMax(self.MOUTH_AVERAGE[2], 'max')):
            self.mouth_classification = 'Large'
        elif(mouth_area < self.calculate_MinMax(self.MOUTH_AVERAGE[2], 'min')):
            self.mouth_classification = 'Under emphasized'
        else:
            self.mouth_classification = 'Normal'


        res = [
            {
                'class' : 'Head',
                'confidence': np.mean(confidence['head']),
                'classification': self.head_classification,
                'area': head_area,
                'width': np.mean(width['head']),
                'height': np.mean(height['head']),
            },
            {
                'class' : 'Hair',
                'confidence': np.mean(confidence['hair']),
                'classification': self.hair_classification,
                'area': hair_area,
                'width': np.mean(width['hair']),
                'height': np.mean(height['hair']),
            },
            {
                'class' : 'Eyes',
                'confidence': np.mean(confidence['eyes']),
                'classification': self.eyes_classification,
                'area': eyes_area,
                'width': np.mean(width['eyes']),
                'height': np.mean(height['eyes']),
            },
            {
                'class' : 'Ear',
                'confidence': np.mean(confidence['ear']),
                'classification': self.ear_classification,
                'area': ears_area,
                'width': np.mean(width['ear']),
                'height': np.mean(height['ear']),
            },
            {
                'class' : 'Nose',
                'confidence': np.mean(confidence['nose']),
                'classification': self.nose_classification,
                'area': nose_area,
                'width': np.mean(width['nose']),
                'height': np.mean(height['nose']),
            },
            {
                'class' : 'Mouth',
                'confidence': np.mean(confidence['mouth']),
                'classification': self.mouth_classification,
                'area': mouth_area,
                'width': np.mean(width['mouth']),
                'height': np.mean(height['mouth']),
            },
            {
                'class' : 'Neck',
                'confidence': np.mean(confidence['neck']),
                'classification': self.neck_classification,
                'area': neck_area,
                'width': np.mean(width['neck']),
                'height': np.mean(height['neck']),
            },
            {
                'class' : 'Arms',
                'confidence': np.mean(confidence['arms']),
                'classification': self.arms_classification,
                'area': arms_area,
                'width': np.mean(width['arms']),
                'height': np.mean(height['arms']),
            },
            {
                'class' : 'Hands',
                'confidence': np.mean(confidence['hands']),
                'classification': self.hands_classification,
                'area': hands_area,
                'width': np.mean(width['hands']),
                'height': np.mean(height['hands']),
            },
            {
                'class' : 'Legs',
                'confidence': np.mean(confidence['legs']),
                'classification': self.legs_classification,
                'area': legs_area,
                'width': np.mean(width['legs']),
                'height': np.mean(height['legs']),
            },
            {
                'class' : 'Feet',
                'confidence': np.mean(confidence['feet']),
                'classification': self.feet_classification,
                'area': feet_area,
                'width': np.mean(width['feet']),
                'height': np.mean(height['feet']),
            },
        ]
        
        return res