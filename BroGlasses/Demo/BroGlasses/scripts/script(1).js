//==============================================================================
// The following example demonstrates how to configure, show and use a NativeUI
// picker.
//
// Project setup:
// - Insert a plane
// - Create a material and assign it to the plane
// - Import textures for use in the picker (set these textures to uncompressed)
//==============================================================================

// Load in the required modules
const NativeUI = require('NativeUI');
const Scene = require('Scene');
const Textures = require('Textures');

// Locate the plane in the Scene
const Glass1 = Scene.root.find('Glass1');
const Glass2 = Scene.root.find('Glass2');

//==============================================================================
// Setup the configuration for the picker
//==============================================================================

// Locate the textures in the Assets
const texture0 = Textures.get('texture0');
const texture1 = Textures.get('texture1');
// const texture2 = Textures.get('texture2');

// Store a reference to the picker
const picker = NativeUI.picker;

// Set a starting index (optional, will be 0 by default)
const index = 0;

// Create a configuration object
const configuration = {

  // The index of the selected item in the picker
  selectedIndex: index,

  // The image textures to use as the items in the picker
  items: [
    {image_texture: texture0},
    {image_texture: texture1}
    // {image_texture: texture2},
    // {image_texture: texture0},
    // {image_texture: texture1},
    // {image_texture: texture2},
    // {image_texture: texture0},
    // {image_texture: texture1},
    // {image_texture: texture2}
  ]

};

//==============================================================================
// Apply the configuration and show the picker
//==============================================================================

// Configure the picker using the configuration object
picker.configure(configuration);

// Set the picker to be visible (visible is false by default)
picker.visible = true;

//==============================================================================
// Use the picker to set the texture of the plane
//==============================================================================

// Subscribe to the selectedIndex scalar signal
picker.selectedIndex.monitor().subscribe(function(index) {
  // Update the texture of the material assigned to the plane to be the selected
  // texture
  // plane.material.diffuse = configuration.items[index.newValue].image_texture;
});
