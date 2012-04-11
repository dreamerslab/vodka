/*!
 * vodka
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * Utility functions.
 */

/**
 * Module dependencies.
 * @private
 */
var fs         = require( 'fs' );
var path       = require( 'path' );
var inflection = require( 'inflection' );
var utils      = require( '../../utils' );
var regex      = utils.regex;

// we must have these 2 declare here because we use `out` in `_`
var _, out;

_ = {

  create : function ( path, content, method ){
    if( _.options && _.options.prefix ){
      path = _.options.prefix + '/' + path;
    }

    out.path_exists( path, function ( full_path ){
      console.log( utils.$fine( 'exists' ) + '  ' + path );
    }, function ( full_path ){
      fs[ method ]( full_path, content );
      console.log( utils.$good( 'create' ) + '  ' + path );
    });
  },

  full_path : function ( path ){
    return process.cwd() + '/' + ( path === undefined ? '' : path );
  },

  valid_name : function ( name, regex ){
    if( regex.test( name )){
      console.log(
        utils.$alert( 'error' ) + '   \'' +
          name + '\' contains invalid characters.'
      );

      return process.exit( 0 );
    }

    return name;
  }
};



out = {

  init : function ( options ){
    _.options = options === undefined ?
      {} : options;
  },

/**
 * Add spaces for better syntax of COKE command line tools.
 * @public
 * @this {utils}
 * @param {Function} str The target string.
 * @param {Function} len Max length inculding the target string plus spaces.
 * @param {Function} to_start Add spaces to the front.
 */
  add_spaces : function ( str, len, to_start ){
    var str_len = str.length;
    var i       = str_len;

    for( ;i < len; i += 1 ){
      if( !to_start ){
        str += ' ';
      }else{
        str = ' ' + str;
      }
    }

    return str;
  },

  valid_actions_name : function ( actions ){
    var tmp = _.valid_name( actions, regex.has_none_characters );

    return inflection.tableize( tmp );
  },

  valid_action_name : function ( action ){
    var tmp = _.valid_name( action, regex.has_none_characters );

    return tmp.toLowerCase();
  },

  is_args_defined : function ( args, msg ){
    if( args === undefined || args.length === 0 ){
      console.log(
        utils.$alert( 'error' ) + '   arguments not defined.'
      );
      console.log( 'Usage example: vodka ' + msg );

      return process.exit( 0 );
    }
  },


/**
 * Check if the current process is working in the project root dir.
 * @public
 * @this {utils}
 * @param {Function} callback The success callback function.
 */
  is_project_root : function ( callback ){
    var current = process.cwd();
    var files   = fs.readdirSync( current );
    var found   = false;

    files.forEach( function ( file ){
      if( file === 'run.js' ){
        callback( current );
        found = true;
      }
    });

    if( !found ){
      console.log(
        utils.$alert( 'error' ) + '   ' +
        '`run.js` not found, are you in the project root dir?'
      );
      process.exit( 0 );
    }
  },

  path : function ( path, template ){
    if( template === undefined ) template = path;

    return this.path_exists_sync( path, undefined, function ( full_path ){
      // not exist, get from template
      return  __dirname + '/templates/' + template;
    });
  },

  path_exists : function ( _path, exist, not_exist ){
    var full_path = _.full_path( _path );

    if( path.existsSync( full_path )){
      exist && exist( full_path );
    }else{
      not_exist && not_exist( full_path );
    }
  },

  path_exists_sync : function ( _path, exist, not_exist ){
    var full_path = _.full_path( _path );

    if( path.existsSync( full_path )){
      if( exist ) return exist( full_path );
    }else{
      if( not_exist ) return not_exist( full_path );
    }

    return full_path;
  },

  exist_alert : function ( path ){
    console.log(
      utils.$alert( 'error' ) + '   ' +
      path + ' already exists'
    );

    process.exit();
  },

  create_dir : function ( path ){
    _.create( path, '0755', 'mkdirSync' );
  },

  create_file : function ( path, content ){
    if( content === undefined ) content = '';

    _.create( path, content, 'writeFileSync' );
  },

  create_file_f : function ( path, content ){
    var full_path = process.cwd() + '/' + path;

    fs.writeFileSync( full_path, content );
    console.log( utils.$update( 'update' ) + '  ' + path );
  },

  create_file_by_template : function ( path ){
    if( !path.match( regex.has_format )){
      path += '.js';
    }

    var content = fs.readFileSync( __dirname + '/templates/' + path, 'utf8' );

    return this.create_file( path, content );
  }
};

/**
 * Exports module.
 */
module.exports = out;