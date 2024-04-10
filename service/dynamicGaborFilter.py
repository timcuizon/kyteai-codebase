# Define the variables and their allowed values for the Gabor filter
import glob
from IPython.display import Image, display
import pandas as pd
import cv2
import numpy as np
from skimage.metrics import peak_signal_noise_ratio
import random
import os

class DynamicGaborFilter():

    def __init__(self, IMAGE_PATH, OUTPUT_PATH, socket):
        self.IMAGE_PATH = IMAGE_PATH
        self.OUTPUT_PATH = OUTPUT_PATH
        self.image = cv2.imread(IMAGE_PATH, cv2.IMREAD_GRAYSCALE)
        self.socket = socket

        # create output directory if it doesn't exist
        if not os.path.exists(OUTPUT_PATH):
          os.makedirs(OUTPUT_PATH)

    # Fitness function to calculate PSNR
    def fitness_function(self, combination):
        ksize, sigma, theta, lambd, gamma, phi,  = combination
        gabor_filter = cv2.getGaborKernel((ksize, ksize), sigma, theta, lambd, gamma, phi, ktype=cv2.CV_32F)
        filtered_image = cv2.filter2D(self.image, cv2.CV_32F, gabor_filter)
        psnr = peak_signal_noise_ratio(self.image, filtered_image)
        return psnr

    def generate (self):
        # Define the variables and their allowed values for the Gabor filter
        variables = {
            'ksizes': [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
            'sigmas': [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
            'thetas': [(1*np.pi/3),(1*np.pi/4), (1*np.pi/6), (11*np.pi/6), (7*np.pi/4), (5*np.pi/3), (4*np.pi/3), (5*np.pi/4), (7*np.pi/6), (5*np.pi/6), (3*np.pi/4), (2*np.pi/3)],
            'lamdas': [(1*np.pi/3),(1*np.pi/4), (1*np.pi/6), (11*np.pi/6), (7*np.pi/4), (5*np.pi/3), (4*np.pi/3), (5*np.pi/4), (7*np.pi/6), (5*np.pi/6), (3*np.pi/4), (2*np.pi/3)],
            'gammas': [.1, .2, .3, .4, .5, .6, .7, .8, .9, 1],
            'phis': [.1, .2, .3, .4, .5, .6, .7, .8, .9, 1]
        }

        # Genetic Algorithm parameters
        population_size = 100
        num_generations = 2
        tournament_size = 50
        mutation_rate = 0.1
        cnt = 1

        # Generate initial population
        population = []
        for _ in range(population_size):
            combination = [random.choice(variables[key]) for key in variables.keys()]
            population.append(combination)

        # Run the Genetic Algorithm
        for generation in range(num_generations):
            # print(f'Generations Progress: {cnt}/{num_generations}')
            # sending the drawing analysis progress percentage to web socket
            percentage = (cnt / num_generations) * 100
            self.socket.emit('loading_percentage', {'percentage': percentage})
            cnt = cnt+1
            # print(f"Generation {generation+1}")
            # Evaluate fitness of each individual in the population
            fitness_scores = [self.fitness_function(combination) for combination in population]

            # Select parents for mating (tournament selection)
            parents = []
            for _ in range(population_size):
                tournament = random.sample(range(population_size), tournament_size)
                winner = max(tournament, key=lambda x: fitness_scores[x])
                parents.append(population[winner])

            # Create offspring through crossover (single-point crossover)
            offspring = []
            for _ in range(population_size):
                parent1, parent2 = random.sample(parents, 2)
                crossover_point = random.randint(1, len(variables) - 1)
                child = parent1[:crossover_point] + parent2[crossover_point:]
                offspring.append(child)

            # Mutate the offspring (random mutation)
            for child in offspring:
                for i in range(len(variables)):
                    if random.random() < mutation_rate:
                        child[i] = random.choice(variables[list(variables.keys())[i]])

        # Replace the population with the offspring
        population = offspring

        # Select the best individual from the final population
        best_individual = max(population, key=lambda x: self.fitness_function(x))

        # Extract the optimal values
        # ksize, lambd, gamma, sigma, phi, theta = best_individual
        ksize, sigma, theta, lambd, gamma, phi = best_individual

        # Create the Gabor filter with the optimal values
        gabor_filter = cv2.getGaborKernel((ksize, ksize), sigma, theta, lambd, gamma, phi, ktype=cv2.CV_32F)

        # Apply the Gabor filter to the input image
        filtered_image = cv2.filter2D(self.image, cv2.CV_32F, gabor_filter)

        # Get the PSNR
        psnr = peak_signal_noise_ratio(self.image, filtered_image)

        # save filtered image to output directory with same file type
        filename = os.path.basename(self.IMAGE_PATH)
        filetype = filename.split('.')[-1]
        output_filename = os.path.join(self.OUTPUT_PATH, filename)
        cv2.imwrite(output_filename, filtered_image)

        return output_filename